<template>
  <div>
    <Menu current="profile"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId" required disabled /> 
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="text" placeholder="パスワード" v-model="user.password" />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="ニックネーム" v-model="user.nickname" />
            </div>
          </div>
          <div class="field">
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
          <template v-if="err">
            <li class="err-msg">{{ err }}</li>
          </template>
          <button class="ui huge green fluid button" type="submit">
            更新
          </button>
        </form>
      </div>
      <button @click="deleteUser" class="ui huge grey fluid button" type="submit">
        退会
      </button>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'Profile',
  components: {
    Menu,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: localStorage.getItem('userId'),
        password: null,
        nickname: null,
        age: null,
        //weight: null,
        //height: null,

      },
      err: null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  created() {
  // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({name: "Login"});

    axios.get(baseUrl + "/user" + "?userId=" + this.user.userId)
      .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response);
        this.user.nickname = response.data.nickname;
        this.user.age = response.data.age;
      })
      .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        this.err = '予期せぬエラーが発生しました';
      }
    );
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    submit() {
      if (!this.user.password) {
          this.err = 'パスワードを入力してください';
          return;
      } else if (!this.user.nickname) {
          this.err = 'ニックネームを入力してください';
          return;
      } else if (!this.user.age) {
          this.err = '年齢を入力してください';
          return;
      }
      const requestBody = {
        userId: this.user.userId,
        password: this.user.password,
        nickname: this.user.nickname,
        age: this.user.age
      };
      axios.put(baseUrl + "/user", requestBody)
        .then(() => {
          // 成功したときの処理はここに記述する
          this.$router.push({ name: 'Home'});
        })
        .catch((e) => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          throw new Error(e);
        }
      );
    },
    deleteUser() {
      axios.delete(baseUrl + "/user", {
        data: {
          userId: this.user.userId
        }
      })
        .then(() => {
          // 成功したときの処理はここに記述する
          this.$router.push({ name: 'Login'});
        })
        .catch((e) => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          throw new Error(e);
        }
      );
    }
  }
}
</script>

<style scoped>

</style>