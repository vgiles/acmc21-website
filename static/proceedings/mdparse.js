const App = {
  el: '#app',
  data() {return {
      input: '# Loading...',
      visibleId: '',
      previousVisibleId: '',
      mdLength: 0,
      headings: [] };
  },
  async created() {
    let url = 'proceedings.md';
    let response = await fetch(url);
    let data = await response.text();
    this.input = data;
  },
  mounted() {
    let options = {
      rootMargin: "0px 0px -200px 0px",
      threshold: 1 };

    const debouncedFunction = this.debounce(this.handleObserver);
    this.observer = new IntersectionObserver(debouncedFunction, options);
    this.motionQuery = window.matchMedia('(prefers-reduced-motion)');
  },
  methods: {
    findHeadings() {
      if (this.observer) {
        this.headings = [...this.$refs.content.querySelectorAll('[id]')];
        this.headings.map(heading => this.observer.observe(heading));
      }
    },
    slugify(text) {
      return text.toString().
      normalize('NFD').
      replace(/[\u0300-\u036f]/g, '').
      toLowerCase().
      trim().
      replace(/\s+/g, '-').
      replace(/[^\w-]+/g, '').
      replace(/--+/g, '-');
    },
    getRelated(item) {
      if (item) {
        const items = this.compiledHeadings;
        const currentIdx = items.indexOf(item);
        let idx = 0;

        // find the correct (parent) index
        if (item.depth === 1) {
          idx = currentIdx + 1;
        } else {
          // find parent index
          let found = false;
          for (let j = currentIdx; j >= 0; j--) {
            if (items[j].depth === 1 && !found) {
              idx = j + 1;
              found = true;
            }
          }
        }

        let children = [];
        let isSameLevel = true;
        for (idx; idx < items.length; idx++) {
          if (items[idx].depth === 2 && isSameLevel) {
            children.push(items[idx]);
          } else
          if (items[idx].depth === 1) {isSameLevel = false;}
        }
        return children;
      }
    },
    handleObserver(entries, observer) {
      entries.forEach(entry => {
        const { target, isIntersecting, intersectionRatio } = entry;
        if (isIntersecting && intersectionRatio >= 1) {
          this.visibleId = `#${target.getAttribute('id')}`;
        }
      });
    },
    handleLinkClick(evt, itemId) {
      evt.preventDefault();
      let id = itemId.replace('#', '');
      let section = this.headings.find(heading => heading.getAttribute('id') === id);
      section.setAttribute('tabindex', -1);
      section.focus();
      this.visibleId = itemId;

      window.scroll({
        behavior: this.motionQuery.matches ? 'instant' : 'smooth',
        top: section.offsetTop - 20,
        block: 'start' });

    },
    debounce(fn) {
      var timeout;
      return function () {
        var context = this;
        var args = arguments;
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
          fn.apply(context, args);
        });
      };
    } },

  watch: {
    mdLength: function (val) {
      this.findHeadings();
    } },

  computed: {
    compiledMarkdown() {
      let htmlFromMarkdown = marked(this.input, { sanitize: true });
      this.mdLength = htmlFromMarkdown.length;
      return htmlFromMarkdown;
    },
    compiledHeadings() {
      let regexString = /#(.*)/g;
      const found = this.input.match(regexString);
      const headings = found.map(item => {
        let depth = (item.match(/#/g) || []).length;
        let text = item.replace(/#/gi, '', '').trim();
        return {
          depth,
          id: `#${this.slugify(text)}`,
          text };

      });
      return headings;
    },
    activeHeadings() {
      let activeItem = this.compiledHeadings.find(item => item.id === this.visibleId);
      let relatedItems = this.getRelated(activeItem) || [];
      return this.compiledHeadings.filter(item => item.depth === 1 || relatedItems.includes(item));
    } } };



new Vue(App);