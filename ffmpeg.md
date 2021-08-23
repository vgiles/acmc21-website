# Little ffmpeg command for overlaying video etc.

```ffmpeg -i powerpoint.mov -i talking.mov -i aim.png -i acmc.png -filter_complex "[1:v]scale=iw/4:-1,crop=iw:ih:ow:0[talking];[3]scale=iw/4:-1[acmc];[0][talking]overlay=x=W-w+10:y=10[out1];[out1][acmc]overlay=x=10:y=10[out2];[out2][2]overlay=x=30:y=H-h;amix=inputs=2" output.mp4```