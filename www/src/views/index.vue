<script setup>
import { ref, onMounted } from "vue";
import { getWeather } from "@/api/index.js";
import { dateFormatter } from "@/util/util.js";
const data = ref({});
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let pos = position.coords;
      refreshWeather({
        latitude: pos.latitude,
        longitude: pos.longitude,
        hourly: "temperature_2m",
      });
    },
    (err) => {
      refreshWeather({
        latitude: 52.52,
        longitude: 13.41,
        hourly: "temperature_2m",
      });
    }
  );
};

const dataFormatter = (res) => {
  let obj = {};
  res.hourly.time.forEach((ele, index) => {
    let key = dateFormatter(ele, "YYYY-MM-DD");
    obj[key] = obj[key] || {
      data: [],
      maxTemperature: res.hourly.temperature_2m[index],
      minTemperature: res.hourly.temperature_2m[index],
      symbol: res.hourly_units.temperature_2m,
    };
    obj[key].maxTemperature = Math.max(
      obj[key].maxTemperature,
      res.hourly.temperature_2m[index]
    );
    obj[key].minTemperature = Math.min(
      obj[key].minTemperature,
      res.hourly.temperature_2m[index]
    );
    obj[key].data.push({
      time: dateFormatter(ele, "hh:mm"),
      temperature: res.hourly.temperature_2m[index],
    });
  });
  data.value = obj;
};

const refreshWeather = (params) => {
  getWeather(params).then((res) => {
    dataFormatter(res);
  });
};

const getAvgTemp = (data) => {
  return (data.reduce((sum, item) => sum + item.temperature, 0) / data.length).toFixed(1);
}

onMounted(() => {
  getLocation();
});
</script>

<template>
  <el-scrollbar style="height: 100%; width: 100%;">
    <el-card>
      <template #header>
        <div>未来几天气温</div>
      </template>
      <div v-for="date in Object.keys(data)" :key="date" class="list">
        <div class="title">
          <span>{{ date }} (单位: {{ data[date].symbol }})</span>
          <span class="max">最高气温: {{ data[date].maxTemperature }}</span> 
          <span class="min">最低气温: {{ data[date].minTemperature }}</span> 
          <span>平均气温: {{ getAvgTemp(data[date].data) }}</span>
        </div>
        <div class="date">
          <div v-for="(o, index) in data[date].data" :key="index" class="hour">
            <span>{{ o.time }}</span>
            <span
              :class="{
                max: data[date].maxTemperature === o.temperature,
                min: data[date].minTemperature === o.temperature,
              }"
              >{{ o.temperature }}</span
            >
          </div>
        </div>
      </div>
    </el-card>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.list {
  border: 1px solid #ebeef5;
  margin-bottom: 10px;
  border-radius: 4px;
  border-bottom: none;

  .title {
    height: 30px;
    border-bottom: 1px solid #ebeef5;
    padding: 0 1em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .max {
      color: red;
    }

    .min {
      color: blue;
    }
  }

  .date {
    overflow: hidden;

    .hour {
      float: left;
      display: flex;
      flex-direction: column;
      width: calc(100% / 12);

      &:nth-child(12n) {
        span {
          border-right: none;
        }
      }

      span {
        height: 30px;
        line-height: 30px;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
      }

      .max {
        background: red;
        color: white;
      }

      .min {
        background: blue;
        color: white;
      }
    }
  }
}
</style>