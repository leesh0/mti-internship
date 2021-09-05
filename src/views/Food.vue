<template>
  <div>
    <Menu current="user"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <h2>カロリー摂取・消費状況</h2>
        <ChartFoodCal />
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
        <h2>栄養摂取状況</h2>
        <ChartFood />
        <div class="ui message">
          <div class="header">アドバイス</div>
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
      <div class="ui segment">
        <p>
          今日
          <span class="today"
            >{{ new Date().getMonth() + 1 }}月{{ new Date().getDate() }}日</span
          >
          に摂った食事を記録してください。
        </p>
      </div>
      <div v-show="foodData.length === 0" class="ui segments">
        <div class="ui orange message">
          入力された料理は登録されていません。
        </div>
      </div>
      <div v-show="foodData.length !== 0" class="ui segments">
        <template v-for="(data, index) in foodData">
          <div class="ui segment wrapper" :key="index">
            <h2 class="ui header">
              <div class="content">
                {{ data.item.description }}
                <div class="ui green label">
                  カロリー：{{ data.item.nutritional_contents.energy.value }}
                  Kcal
                </div>
                <div class="ui gray label">
                  タンパク質：{{ data.item.nutritional_contents.protein }} g
                </div>
                <div class="ui gray label">
                  炭水化物：{{ data.item.nutritional_contents.carbohydrates }}
                  g
                </div>
                <div class="ui gray label">
                  脂肪：{{ data.item.nutritional_contents.fat }} g
                </div>
              </div>
            </h2>
            <div class="ui input">
              <div>
                <input
                  type="text"
                  placeholder="食べた量(g)"
                  :id="data.item.id + 'eated'"
                />
              </div>
              <div class="ml-5">
                <input
                  type="time"
                  placeholder="食べた時間()"
                  :id="data.item.id + 'timestamp'"
                />
              </div>
              <button
                class="ui primary button tiny ml-5"
                v-on:click="submit(data.item.id)"
              >
                記録
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
import ChartFood from "@/components/ChartFood.vue";
import ChartFoodCal from "@/components/ChartFoodCal.vue";
import { baseUrl } from "@/assets/config.js";
import axios from "axios";

export default {
  name: "Food",
  components: {
    Menu,
    Footer,
    ChartFood,
    ChartFoodCal,
  },
  data() {
    return {
      // Vue.jsで使う変数はここに記述する
      foodData: [],
      foodName: "カレー",
    };
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },
  watch: {
    foodName: async function() {
      //const auth_token = "mti-2021-final";
      const auth_token = localStorage.getItem("token");
      axios
        .get(baseUrl + "/api/nutrition-search?q=" + this.foodName, {
          headers: {
            token: auth_token,
          },
        })
        .then((response) => {
          // 成功したときの処理はここに記述する
          console.log(response.data.items);
          this.foodData = response.data.items;
        })
        .catch((err) => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          console.log(err);
        });
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({ name: "Login" });

    //const auth_token = "mti-2021-final";
    const auth_token = localStorage.getItem("token");
    axios
      .get(baseUrl + "/api/nutrition-search?q=" + this.foodName, {
        headers: {
          token: auth_token,
        },
      })
      .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response.data.items);
        this.foodData = response.data.items;
      })
      .catch((err) => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        window.alert("エラー");
        console.log(err);
      });
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    submit(foodId) {
      const eated = document.getElementById(foodId + "eated").value;
      const timestamp = document.getElementById(foodId + "timestamp").value;

      // Nullチェック
      if (!eated) {
        window.alert("食べた量が入力されていません。");
        return;
      } else if (!timestamp) {
        window.alert("食べた時間が入力されていません。");
        return;
      }
      console.log(timestamp);

      const today = new Date();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      const UnixTimestamp = Date.parse(
        `${today.getFullYear()}-${month
          .toString()
          .padStart(2, "0")}-${date
          .toString()
          .padStart(2, "0")} ${timestamp}:00`
      );
      console.log(UnixTimestamp);

      window.alert(
        "料理ID : " +
          foodId +
          "\n" +
          "食べた量(g) : " +
          eated +
          "\n" +
          "食べた時間 : " +
          UnixTimestamp +
          "を記録"
      );
    },
  },
};
</script>
<style scoped>
.ml-5 {
  margin-left: 5px;
}
.today {
  font-size: 160%;
  font-weight: bolder;
}
</style>
