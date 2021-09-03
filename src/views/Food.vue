<template>
  <div>
    <Menu current="user"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h2>カロリー摂取・消費状況</h2>
        <ChartFoodCal />
        <div class="ui message">
          <div class="header">
            アドバイス
          </div>
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
        <h2>栄養摂取状況</h2>
        <ChartFood />
        <div class="ui message">
          <div class="header">
            アドバイス
          </div>
          <div class="ui comments">
            <div class="comment">
              <a class="avatar">
                <img
                  src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
                />
              </a>
              <div class="content">
                <a class="author">アドバイザー</a>
                <div class="text">
                  栄養が偏っています。バランスの良い食事を心がけましょう。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <h2>食事の記録</h2>
        <form class="ui form">
          <div class="field">
            <label>食べた料理名を入力してください。</label>
            <div class="ui left icon input">
              <i class="search icon"></i>
              <input type="text" placeholder="料理名" v-model="foodName" />
            </div>
          </div>
        </form>
      </div>
      <div v-show="foodData.length === 0" class="ui segments">
        <div class="ui orange message">
          入力された料理は登録されていません。
        </div>
      </div>
      <div v-show="foodData.length !== 0" class="ui segments">
        <template v-for="(data, index) in foodData">
          <div class="ui segment wrapper" :key="index">
            <div class="ui grid">
              <div class="fourteen wide column">
                <h2 class="ui header">
                  <div class="content">
                    {{ data.name }}
                    <div class="ui green label">
                      カロリー：{{ data.kcal }} Kcal
                    </div>
                    <div class="ui gray label">タンパク質：{{ data.p }} g</div>
                    <div class="ui gray label">炭水化物：{{ data.c }} g</div>
                    <div class="ui gray label">脂肪：{{ data.f }} g</div>
                  </div>
                </h2>
              </div>
              <div class="two wide column">
                <button
                  class="ui primary button"
                  v-on:click="submit(data.name)"
                >
                  記録
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
import ChartFood from "@/components/ChartFood.vue";
import ChartFoodCal from "@/components/ChartFoodCal.vue";
import { baseUrl } from "@/assets/config.js";
import axios from "axios";

export default {
  name: "Food",
  components: {
    Menu,
    ChartFood,
    ChartFoodCal,
  },
  data() {
    return {
      // Vue.jsで使う変数はここに記述する
      foodData: [],
      foodName: "",
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  watch: {
    foodName: async function() {
      console.log("ニックネーム変更");
      console.log(this.foodName);
      axios
        .get(baseUrl + "/food/search?q=" + this.foodName)
        .then((response) => {
          // 成功したときの処理はここに記述する
          console.log(response);
          this.foodData = response.data.data;
        })
        .catch((err) => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          console.log(err);
        });
    },
  },
  created() {
    axios
      .get(baseUrl + "/food/search?q=" + this.foodName)
      .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response);
        this.foodData = response.data.data;
      })
      .catch((err) => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        console.log(err);
      });
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    submit(foodName) {
      window.alert(foodName + "を記録");
    },
  },
};
</script>
<style scoped>
.savebtn {
  margin-left: 30px;
}
</style>
