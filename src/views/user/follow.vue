<template>
  <div class="follow">
    <NnHeader title="我的跟帖" />
    <NnRefresh api="我的跟帖" @getList="getList">
      <template v-slot:default>
        <div class="item" v-for="(v, i) in list" :key="i">
          <div class="time">
            {{ is_moment(v.create_date, "YYYY-MM-DD kk:mm") }}
          </div>
          <div class="look" v-if="v.parent">
            <div class="parent-name">回复 : {{ v.parent.user.nickname }}</div>
            <div class="parent-content">{{ v.parent.content }}</div>
          </div>
          <div class="title">{{ v.content }}</div>
          <div class="foot">
            <p>原文 : {{ v.post.title }}</p>
            <i class="iconfont iconjiantou1"></i>
          </div>
        </div>
      </template>
    </NnRefresh>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { is_moment } from '/@/methods'

export default defineComponent( {
  name: 'user_follow',
  setup ( props, context ) {
    const data = reactive( {
      list: []
    } )

    const getList = ( res: any ) => {
      data.list = res
    }

    return {
      ...toRefs( data ),
      is_moment,
      getList
    }
  }
} )
</script>

<style lang="less" scoped>
.follow {
  .item {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    .time {
      line-height: 24px;
      height: 24px;
      color: #999;
    }
    .look {
      width: 95%;
      background-color: #eee;
      color: #999;
      padding: 10px;
      .parent-name {
        padding: 0 0 5px;
        font-size: 14px;
      }
    }
    .title {
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 14px;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
