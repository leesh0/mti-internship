<template>
  <div>
    <Menu current="home"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h2>テストユーザー さん</h2>
        <!--  -->
        <div class="ui grid">
          <div class="ten wide column">
            <table class="ui celled table">
              <thead>
                <tr>
                  <th>項目</th>
                  <th>現在の数値</th>
                  <th>目標数値まで</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Name">体重</td>
                  <td data-label="Age">55Kg</td>
                  <td data-label="Job">-5Kg</td>
                </tr>
                <tr>
                  <td data-label="Name">身長</td>
                  <td data-label="Age">150Kg</td>
                  <td data-label="Job">+3cm</td>
                </tr>
                <tr>
                  <td data-label="Name">ウエスト</td>
                  <td data-label="Age">60cm</td>
                  <td data-label="Job">-5cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="six wide column">
            <div class="ui teal message">
              <h3>今日の目標摂取・消費カロリー</h3>
              <h1 v-if="true">あと 10Kcal 摂取しましょう</h1>
              <h1 v-else>あと 10Kcal 消費しましょう</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <BarChart />
      </div>
      <div class="ui segment">
        <div class="ui grid">
          <div class="eight wide column">
            <h3>運動に関するアドバイス</h3>
            <div class="ui comments">
              <div class="comment">
                <a class="avatar">
                  <img
                    src="https://semantic-ui.com/images/avatar/small/elliot.jpg"
                  />
                </a>
                <div class="content">
                  <a class="author">エクササイズアドバイザー</a>
                  <div class="text">
                    もう少し運動しましょう。以下の運動がおすすめです!!
                    <ul>
                      <li>
                        <h3>ウォーキング</h3>
                      </li>
                      <li>
                        <h3>スクワット</h3>
                      </li>
                    </ul>
                    <a href="">もっと見る</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="eight wide column">
            <h3>食事に関するアドバイス</h3>
            <div class="ui comments">
              <div class="comment">
                <a class="avatar">
                  <img
                    src="https://semantic-ui.com/images/avatar/small/stevie.jpg"
                  />
                </a>
                <div class="content">
                  <a class="author">食のアドバイザー</a>
                  <div class="text">
                    脂質の摂取を控えましょう。以下の食事がおすすめです!!
                    <ul>
                      <li>
                        <h3>サラダ</h3>
                      </li>
                      <li>
                        <h3>うどん</h3>
                      </li>
                    </ul>
                    <a href="">もっと見る</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { baseUrl } from '@/assets/config.js';
// import axios from "axios";
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";
import Menu from "@/components/Menu.vue";
import BarChart from "@/components/BarChart.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Menu,
    BarChart,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
        err: null,
      },
      search: {
        username: "",
        category: "",
        start: "",
        end: "",
        err: null,
      },
      query: {
        start: null,
        end: null,
      },
      articles: [],
      iam: null,
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    sortedArticles() {
      // sort()は破壊的変更のため、一度コピーしてから使う
      const articles = [...this.articles];
      const sortedArticles = articles.sort((previos, next) => {
        return previos.timestamp - next.timestamp;
      });
      return sortedArticles;
    },
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({ name: "Login" });

    this.iam = localStorage.getItem("userId");
    // apiからarticleを取得する
    this.getArticles();
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    getArticles() {
      axios
        .get(baseUrl + "/posts")
        .then((response) => {
          this.articles = response.data.posts;
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    // Vue.jsで使う関数はここで記述する
    postArticle() {
      if (!this.post.text || this.post.text.length == 0) {
        this.post.err = "投稿内容を入力してください";
        return;
      }
      const requestBody = {
        userId: this.iam,
        text: this.post.text,
        category: this.post.category,
      };
      axios
        .post(baseUrl + "/post", requestBody)
        .then(() => {
          this.post.text = null;
          this.post.category = null;
          this.post.err = null;
          this.getArticles();
        })
        .catch(() => {
          this.post.err = "予期せぬエラーが発生しました";
        });
    },
    searchArticle() {
      if (!this.search.username) {
        this.search.err = "userIdは必須です";
        return;
      } else if (this.search.start && !this.search.end) {
        this.search.err = "終了時刻も入力してください";
        return;
      } else {
        if (this.search.start) {
          this.query.start = Number(Date.parse(this.search.start));
          this.query.end = Number(Date.parse(this.search.end));
          if (this.query.start === this.query.end) {
            this.search.err = "開始日と終了日は同じ日付にできません";
            return;
          } else if (this.query.start > this.query.end) {
            this.search.err = "開始日を終了日より前に設定することはできません";
            return;
          }
        }
        if (!this.search.category) {
          this.search.category = "";
        }
        const startQuery = this.query.start ? `&start=${this.query.start}` : "";
        const endQuery = this.query.end ? `&end=${this.query.end}` : "";
        const categoryQuery = this.search.category
          ? `&category=${this.search.category}`
          : "";
        axios
          .get(
            baseUrl +
              "/post" +
              "?userId=" +
              this.search.username +
              startQuery +
              endQuery +
              categoryQuery
          )
          .then((response) => {
            // 成功したときの処理はここに記述する
            this.articles = response.data.articles;
            this.search.err = null;
          })
          .catch(() => {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            this.search.err = "予期せぬエラーが発生しました";
          });
      }
    },
    deleteArticle(article) {
      axios
        .delete(baseUrl + "/post", {
          data: {
            // Overwrite Axios's automatically set Content-Type
            userId: this.iam,
            timestamp: article.timestamp,
          },
        })
        .then(() => {
          this.getArticles();
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    fromUnixtoDate(timestamp) {
      const dt = new Date(timestamp);
      return (
        dt.getFullYear() +
        "/" +
        (dt.getMonth() + 1) +
        "/" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
      );
    },
  },
};
</script>
<style scoped>
.post-textarea {
  height: 150px;
  min-height: 50px;
  margin-bottom: 10px;
  overflow: scroll;
  border: 1px solid grey;
}

.post-category {
  width: 175px !important;
  height: 30px;
}

.post-inline {
  margin-top: 10px !important;
  position: relative;
}

.search-name,
.search-category {
  height: 30px;
}

.search-date-wrapper > label {
  margin-right: 10px !important;
}

.search-date {
  width: 160px !important;
  margin-right: 10px !important;
  height: 30px;
}

.article-username {
  margin: 0 0 5px 0;
}

.article-delete {
  position: absolute;
  right: 5px;
  top: 20px;
}

.err-msg {
  color: red;
  font-size: 15px;
  margin-bottom: 10px;
}
.comment {
  font-size: 120%;
}
</style>
