<template>
  <div>
    <Menu></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId" />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input
                type="password" placeholder="パスワード" v-model="user.password" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="ニックネーム" v-model="user.nickname" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="年齢" v-model.number="user.age" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <!-- アイコンを追加 -->
              <input type="text" placeholder="体重" v-model.number="user.weight" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <!-- アイコンを追加 -->
              <input type="text" placeholder="身長" v-model.number="user.height" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input" v-if="!isLogin">
              <label class="radiobutton"><br>
                <input class="gender" type="radio" name="gender" value="male" v-model.number="user.sex" checked/>
              </label>
              <label class="gender">
                <i class="male icon"></i>
                <label>男性</label>
              </label>
              <label class="radiobutton"><br>
                <input class="gender" type="radio" name="gender" value="female" v-model.number="user.sex"/>
              </label>
              <label class="gender">
                <i class="female icon"></i>
                <label>女性</label>
              </label>
            </div>
          </div>
          <li v-if="err" class="err-msg">{{ err }}</li>
          <button class="ui huge green fluid button" type="submit">
            {{ submitText }}
          </button>
        </form>
      </div>
      <button @click="toggleMode()" class="ui huge grey fluid button" type="submit">
        {{ toggleText }}
      </button>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "@/assets/config.js";
import axios from "axios";
import Menu from "@/components/Menu.vue";

export default {
  name: "Login",
  components: {
    Menu,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      user: {
        userId: null,
        password: null,
        nickname: null,
        age: null,
        weight: null,
        height: null,
        sex: null,
      },
      err: null,
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText() {
      return this.isLogin ? "ログイン" : "新規登録";
    },
    toggleText() {
      return this.isLogin ? "新規登録" : "ログイン";
    },
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    //radio button確認用スクリプト
    /*buttonCheck() {
      let elements = document.getElementsByName('gender');
      if (elements.item(0).checked){
        console.log('選択されているのは ' + elements.item(0).value + ' です');
        return elements.item(0).value;
      } else if(elements.item(1).checked){
        console.log('選択されているのは ' + elements.item(1).value + ' です');
        return elements.item(1).value;
      }
    },*/
    submit() {
      let elements = document.getElementsByName('gender'); //radiobuttonの変更を変数に代入
      if (this.isLogin) {
        if (!this.user.userId) {
          this.err = "userIdを入力してください";
        } else if (!this.user.password) {
          this.err = "パスワードを入力してください";
        } else {
          // ログイン処理はここに
          const requestBody = {
            userId: this.user.userId,
            password: this.user.password,
          };
          axios
            .post(baseUrl + "/user/login", requestBody)
            .then((response) => {
              // 成功したときの処理はここに記述する
              console.log(response.data);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", this.user.userId);
              this.$router.push({ name: "Home" });
            })
            .catch(() => {
              // レスポンスがエラーで返ってきたときの処理はここに記述する
              this.err = "予期せぬエラーが発生しました";
            });
        }
        return;
      }
      if (!this.user.userId) {
        this.err = "userIdを入力してください";
      } else if (!this.user.password) {
        this.err = "パスワードを入力してください";
      } else if (!this.user.nickname) {
        this.err = "ニックネームを入力してください";
      } else if (!this.user.age) {
        this.err = "年齢を入力してください";
      } else if (!this.user.weight) {
        this.err = "体重を入力してください";
      } else if (!this.user.height) {
        this.err = "身長を入力してください";
      } else if (!elements.item(0).checked && !elements.item(1).checked) {
        this.err = "性別を選択してください";
      } else {
        // APIにPOSTリクエストを送る
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
          nickname: this.user.nickname,
          age: this.user.age,
          weight: this.user.weight,
          height: this.user.height,
          sex: this.user.sex,
        };
        axios
          .post(baseUrl + "/user/register", requestBody)
          .then((response) => {
            // 成功したときの処理はここに記述する
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", this.user.userId);
            this.$router.push({ name: "Home" });
          })
          .catch(() => {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            this.err = "予期せぬエラーが発生しました";
          });
      }
    },
  },
};
</script>
<style scoped>
.radiobutton{
  margin-left: 10px;
}
.gender {
  margin-left: 5px;
  margin-top: 24px;
}
</style>
