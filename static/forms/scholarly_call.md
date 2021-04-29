# Submit an abstract

Use this form to submit an abstract to ACMC21. 

<form name="paper submission" method="POST" data-netlify="true">
    <label for="NAME">1. Full name:</label>
    <input type="text" id="NAME" name="NAME"><br><hr>
    <label for="EMAIL">2. Email address:</label>
    <input type="email" id="EMAIL" name="EMAIL"><br><hr>
    <label for="TITLE">3. Title of paper:</label>
    <input type="text" id="TITLE" name="TITLE"><br><hr>
    <label for="LOCATION">4. Select a location preference</label><br>
    <input type="radio" id="SYDNEY" name="LOCATION" value="Sydney">
    <label for="sydney">Sydney</label><br>
    <input type="radio" id="MELBOURNE" name="LOCATION" value="Melbourne">
    <label for="Melbourne">Melbourne</label><br>
    <input type="radio" id="ONLINE" name="LOCATION" value="Online">
    <label for="Online">Online</label><br><hr>
    <label for="DIVERSITY1">5. Please select the statement that best suits your research project.</label><br>
    <input type="radio" id="about" name="DIVERSITY1" value="d1">
    <label for="about">My research is ABOUT marginalised people but does NOT include their voices in the research (example: "my research is ABOUT differently-abled people engaging in computer music")<br>
    <input type="radio" id="with" name="DIVERSITY1" value="d2">
    <label for="with">My research is about marginalised people but DOES include their voices in the project (example: "my research is about differently-abled people engaging in computer music and specifically includes those people in the research process")<br>
    <input type="radio" id="notapplicable" name="DIVERSITY1" value="d3">
    <label for="notapplicable">My research is not about marginalised voices.</option><br><hr>
    <label for="DIVERSITY2">6. Please expand on the above question if you selected either of the ABOUT/INCLUDES options. Please note that if you yourself are from a marginalised group you do NOT need to include that information unless you want to and are comfortable to do so.</label><br>
    <textarea id="DIVERSITY2" name="DIVERSITY2" rows="4" cols="50"></textarea><br><hr>
    <label for="fileUpload">7. Please upload a PDF file of your abstract. Ensure that the file is as small as possible (50-100kb should be enough for an abstract). Make sure to remove identifying labels (name, etc.)</label><br>
    <input type="file" name="abstract"></input>
</form>