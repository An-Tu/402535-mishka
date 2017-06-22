"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var mqpacker = require("css-mqpacker");
var mincss = require("gulp-csso");
var rename = require("gulp-rename");
var imgmin = require("gulp-imagemin");
var jsmin = require("gulp-jsmin");
var run = require("run-sequence");
var del = require("del");


gulp.task("style", function() {
  return gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(mincss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imgmin([
      imgmin.optipng({optimizationLevel: 3}),
      imgmin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("script", function () {
  return gulp.src("js/*.js")
    .pipe(jsmin())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("sprite", function () {
  return gulp.src([
    "build/img/icon-cart.svg",
    "build/img/icon-fb.svg",
    "build/img/icon-insta.svg",
    "build/img/icon-search.svg",
    "build/img/icon-twitter.svg",
    "build/img/icon-phone.svg",
    "build/img/icon-mail.svg",
    "build/img/icon-*-arrow.svg",
    "build/img/logo-*.svg",
    "build/img/icon-toy.svg",
    "build/img/icon-interior.svg"
  ])
    .pipe(svgmin({
      plugins:[{
        removeAttrs: {attrs: "(stroke|fill)"}
      }]
    }))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/sprite"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("build", function (fn) {
  return run("clean", "copy", "style", "images", "sprite", "script", fn);
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});


gulp.task("clean", function () {
  return del("build");
});

gulp.task("html:copy", function () {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function (done) {
  server.reload();
  done();
});
