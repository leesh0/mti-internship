<template>
  <div>
    <Menu current="user"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>食べた料理名を入力してください。</label>
            <div class="ui left icon input">
              <i class="search icon"></i>
              <input type="text" placeholder="料理名" v-model="nickname" />
            </div>
          </div>
        </form>
      </div>
      <div class="ui segments">
        <template v-for="(user, index) in users">
          <div class="ui segment wrapper" :key="index">
            <h2 class="ui header">
              <div class="content">
                {{ user.name }}
                <div class="ui green label">カロリー：{{ user.kcal }} Kcal</div>
                <div class="ui gray label">タンパク質：{{ user.p }} g</div>
                <div class="ui gray label">炭水化物：{{ user.c }} g</div>
                <div class="ui gray label">脂肪：{{ user.f }} g</div>
              </div>
            </h2>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
import { baseUrl } from "@/assets/config.js";
import axios from "axios";

export default {
  name: "User",
  components: {
    Menu,
  },
  data() {
    return {
      // Vue.jsで使う変数はここに記述する
      users: [],
      nickname: null,
      start: 0,
      end: 100,
      query: {
        nickname: null,
        start: null,
        end: null,
      },
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  watch: {
    nickname: async function() {
      console.log("ニックネーム変更");
      console.log(this.nickname);
      axios
        .get(baseUrl + "/food/search?q=" + this.nickname)
        .then((response) => {
          // 成功したときの処理はここに記述する
          console.log(response);
          this.users = response.data.data;
        })
        .catch((err) => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          console.log(err);
        });
    },
  },
  created() {},
  methods: {
    // Vue.jsで使う関数はここで記述する
  },
};
</script>
<style scoped></style>
