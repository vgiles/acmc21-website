# Little ffmpeg command for overlaying video etc.

```ffmpeg -i powerpoint.mov -i talking.mov -i aim.png -i acmc.png -filter_complex "[1:v]scale=iw/4:-1,crop=iw:ih:ow:0[talking];[3]scale=iw/4:-1[acmc];[0][talking]overlay=x=W-w+10:y=10[out1];[out1][acmc]overlay=x=10:y=10[out2];[out2][2]overlay=x=30:y=H-h;amix=inputs=2" output.mp4```

```ffmpeg -i powerpoint.mov -i talking.mov -i video_overlay.png -filter_complex "[1]scale=iw/4:-1[talk];[2][0]scale2ref=oh*mdar:h=in_h:[olay][bg];amix=inputs=2;[bg][olay]overlay=0:0[blorf];[blorf][talk]overlay=x=20:y=H-h-20" output.mp4 && ffmpeg -i output.mp4 -af loudnorm=I=-13 norm_output.mp4```