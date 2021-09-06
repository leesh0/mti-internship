<template>
  <div
    style="position: relative;
           padding-bottom: 30px;"
  >
    <Menu current="exercise"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h2>カロリー摂取・消費状況</h2>
        <Chart />
        <div class="ui message">
          <div class="header">アドバイス</div>
          <div class="ui comments">
            <div class="comment">
              <a class="avatar">
                <img
                  src="https://semantic-ui.com/images/avatar/small/stevie.jpg"
                />
              </a>
              <div class="content">
                <a class="author">アドバイザー</a>
                <div class="text">
                  カロリー摂取が安定していません。安定した食生活にしましょう。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <h2>おすすめの運動</h2>
        <ul>
          <li>
            <h3>ウォーキング 10分</h3>
          </li>
          <li>
            <h3>スクワット 20回</h3>
          </li>
        </ul>
      </div>
      <div class="ui segment">
        <h2>運動の記録</h2>
        <div class="field">
          <form class="ui form">
            <div class="field">
              <label>行った運動を選択してください。</label>
            </div>
            <div class="ui grid">
              <div class="four wide column">
                <div class="ui card">
                  <div class="content">
                    <h2 class="ui header">
                      <div class="sub header">
                        筋トレ
                      </div>
                      腕立て
                      <div class="sub header">
                        カロリー : 132kcal 回数: 15 × 3
                      </div>
                    </h2>
                    <button class="fluid ui green button">check</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
import { baseUrl } from "@/assets/config.js";
import axios from "axios";
import Chart from "@/components/Chart.vue";
export default {
  name: "Exercise",
  components: {
    Menu,
    Chart,
    Footer,
  },
  data() {
    return {};
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    filterdUsers() {
      let result = [...this.users];
      if (this.nickname) {
        result = result.filter((target) => {
          if (target.nickname) {
            return target.nickname.match(this.nickname);
          } else {
            return;
          }
        });
      }
      if (this.start) {
        result = result.filter((target) => {
          return target.age >= this.start;
        });
      }
      if (this.end) {
        result = result.filter((target) => {
          return target.age <= this.end;
        });
      }
      return result;
    },
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({ name: "Login" });
    axios
      .get(baseUrl + "/users")
      .then((response) => {
        // 成功したときの処理はここに記述する
        this.users = response.data.users;
      })
      .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
      });
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
  },
};
</script>
<style scoped></style>
