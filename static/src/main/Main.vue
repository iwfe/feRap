<template>
  <div class="container-panel">
    <el-row
      class="team-card-row"
      :gutter="32"
      justify="space-between"
    >
      <el-col
        class="team-card-col"
        :span="4"
        v-for="(team, index) in teams"
        :key="index"
      >
        <el-card
          :body-style="{ padding: '0px' }"
        >
          <div class="team-card-header">
            <p
              class="team-card-title"
              v-show="!team.__showIpt"
            >{{team.name}}</p>
            <p
              class="team-card-des"
            >{{team.description}}</p>
          </div>
          <div class="team-card-bottom">
            <el-button
              type="primary"
              size="small"
              v-if="!team.joined"
              :loading="team.loading"
              @click="joinTeam(index)"
            >加入</el-button>
            <el-button
              type="warning"
              size="small"
              v-if="team.joined"
              :loading="team.loading"
              @click="exitTeam(index)"
            >退出</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from './api.js'
  import {
    Row,
    Col,
    Card,
    Button,
    Input
  } from 'element-ui'
  export default {
    name: 'Main',
    components: {
      ElRow: Row,
      ElCol: Col,
      ElCard: Card,
      ElButton: Button,
      ElInput: Input
    },
    data () {
      return {
        teams: []
      }
    },
    mounted () {
      this.getAllTeams()
      console.log(this.$store.getters['login/getLoginStatus'])
    },
    methods: {
      getAllTeams () {
        const self = this
        api.getAllTeamList(function (res) {
          self.addAttrForTeams(res)
        })
      },
      join (teamId) {
        const self = this
        api.joinIntoTeam(teamId, function (res) {
          self.getAllTeams()
        })
      },
      quit (teamId) {
        const self = this
        api.quitFromTeam(teamId, function (res) {
          self.getAllTeams()
        })
      },
      addAttrForTeams (res) {
        if (res && res.length) {
          this.teams = res.map((item, index) => {
            item.__loading = false
            if (!item.joined) item.joined = false
            return item
          })
        }
      },
      joinTeam (index) {
        const team = this.teams[index]
        team.__loading = true
        api.joinIntoTeam(team.id, res => {
          team.__loading = false
          team.joined = true
        })
      },
      exitTeam (index) {
        const team = this.teams[index]
        team.__loading = true
        api.quitFromTeam(team.id, res => {
          team.__loading = false
          team.joined = false
        })
      }
    }
  }
</script>

<style lang="less" scoped >
.team-card-row{
  padding-top: 20px;
}
.team-card-col{
  margin-bottom: 32px;
}
.team-card-header{
  padding: 8px;
  border-bottom: 1px solid #d1dbe5;
}
.team-card-title{
  .icon{
    display: none;
    cursor: pointer;
  }
  &:hover .icon{
    display: inline-block;
  }
}
.team-card-bottom{
  padding: 8px;
  text-align: right;
}
.team-card-des{
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #aaa;
}
.team-card-title{
  line-height: 32px;
  font-size: 16px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.team-card-ipt{
  height: 32px;
}
.container-panel {
  box-sizing: border-box;
  padding: 0 5%;
  color: #475669;
}
</style>
