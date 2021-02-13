<template>
  <!-- 回复 -->
  <div class="reply">
    <reply
      v-if="parent.parent"
      :parent="parent.parent"
      :count="count - 1"
      @onClick="get_lock"
    />
    <div :class="{ call: true, i: !parent.parent }">
      <div class="top">
        <div class="left">
          <div class="name">
            <span>{{ count }}楼</span>
            <span>{{ parent.user.nickname }}</span>
          </div>
        </div>
        <div class="center">
          <div class="time">{{ is_moment(parent.create_date) }}</div>
        </div>
        <div class="right" @click="get_lock">回复</div>
      </div>
      <div class="text">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { is_moment } from '/@/methods'

export default defineComponent( {
  name: 'reply',
  props: { parent: Object, count: Number },
  setup ( props, text ) {

    const get_lock = () => {
      text.emit( 'onClick', props.parent )
    }

    return {
      is_moment,
      get_lock
    }
  }
} )
</script>

<style lang="less" scoped>
.reply {
  width: 100%;
  font-size: 14px;
  .call {
    border: 1px solid #000;
    border-top: none;
    background: #ddd;
    padding: 10px;
    .top {
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        .name {
          color: #000;
          span {
            margin-right: 12px;
          }
        }
      }
      .center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .time {
          font-size: 14px;
          color: #999;
        }
      }
      .right {
        width: 40px;
      }
    }
    .text {
      padding: 10px 0;
      text-indent: 1em;
    }
  }
  .call.i {
    border-top: 1px solid #000;
  }
}
</style>
