// Gulp
const gulp = require('gulp')
// ファイルリネーム
const rename = require('gulp-rename')
// Pug
const pug = require('gulp-pug')

// テンプレート
const template = './src/pug/views/article.pug'
// データファイル
const data = require('./src/json/article.json')

// ビルドタスク
const build = (callback) => {

  // カテゴリーのループ
  Object.keys(data).forEach((catKey) => {


    // Gulpタスク
    gulp.src(template)
      .pipe(
        pug({
          // Pugテンプレートファイルに変数を渡す
          locals: {
            category: catKey,
            municipality: data[catKey]["municipality"],
            title: data[catKey]["title"],
            subtitle1: data[catKey]["subtitle1"],
            body1: data[catKey]["body1"],
            subtitle2: data[catKey]["subtitle2"],
            body2: data[catKey]["body2"],
            subtitle3: data[catKey]["subtitle3"],
            body3: data[catKey]["body3"],
            link: data[catKey]["link"],
            td1: data[catKey]["td1"],
            td2: data[catKey]["td2"],
            td3: data[catKey]["td3"],
            td4: data[catKey]["td4"],
            td5: data[catKey]["td5"],
            td6: data[catKey]["td6"],
            td7: data[catKey]["td7"],
            nextlink: data[catKey]["nextlink"]
          }
        })
      )

      // 出力先
      .pipe(
        rename(`${catKey}.html`)
      )

      .pipe(
        gulp.dest('./html/draft/')
      )
  })

  callback()
}

// タスク実行
gulp.task('default', build)
