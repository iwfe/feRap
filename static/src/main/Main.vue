<template>
  <div class="main-container-panel">
    <div class="teams-wrap">
      <h2>星标团队</h2>
      <div class="teams-stared-list">
        <transition-group
          tag="div"
          name="teams-item"
        >
          <div class="teams-item" v-for="team in staredTeams" :key="team.id">
            <div class="header">
              <p class="team-title" @click="handleTitle($event, team)">{{team.name}}</p>
              <i class="edit-icon el-icon-edit"></i>
              <i class="star-icon el-icon-star-on" @click="stared(team)"></i>
            </div>
            <div class="team-content">{{team.description}}</div>
            <div class="team-footer">
              <el-button class="team-button" :type="team.joined ? '' : 'primary'" size="small" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="teams-wrap">
      <h2>我加入的团队</h2>
      <div class="teams-joined-list">
        <transition-group
          tag="div"
          name="teams-item"
        >
          <div class="teams-item" v-for="team in joinedTeams" :key="team.id">
            <div class="header">
              <p class="team-title">
                <span class="fs-nowrap team-title">{{team.name}}</span>
              </p>
              <i class="star-icon" :class="team.stared ? 'el-icon-star-on' : 'el-icon-star-off'" @click="stared(team)"></i>
            </div>
            <div class="team-content">{{team.description}}</div>
            <div class="team-footer">
              <el-button :type="team.joined ? '' : 'primary'" size="small" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="teams-wrap">
      <h2>所有团队</h2>
      <div class="teams-all-list">
        <transition-group
          tag="div"
          name="teams-item"
        >
          <div class="teams-item" v-for="team in allTeams" :key="team.id">
            <div class="header">
              <p class="team-title">
                <span class="fs-nowrap team-title">{{team.name}}</span>
              </p>
              <i class="star-icon" :class="team.stared ? 'el-icon-star-on' : 'el-icon-star-off'" @click="stared(team)"></i>
            </div>
            <div class="team-content">{{team.description}}</div>
            <div class="team-footer">
              <el-button :type="team.joined ? '' : 'primary'" size="small" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- <el-row class="team-card-row" :gutter="32" justify="space-between">
      <el-col class="team-card-col" :span="4" v-for="(team, index) in teams" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div class="team-card-header">
            <p class="team-card-title" v-show="!team.__showIpt">{{team.name}}</p>
            <p class="team-card-des">{{team.description}}</p>
          </div>
          <div class="team-card-bottom">
            <el-button type="primary" size="small" v-if="!team.joined" :loading="team.loading" @click="joinTeam(index)">加入</el-button>
            <el-button type="warning" size="small" v-if="team.joined" :loading="team.loading" @click="exitTeam(index)">退出</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import api from './api.js'
import { mapGetters } from 'vuex'
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Message
} from 'element-ui'
let curMessage

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
      isJoining: false,
      teams: [],
      staredTeams: [],
      joinedTeams: [],
      allTeams: []
    }
  },
  computed: {
    ...mapGetters({
      starItems: 'teams/starItems'
    })
  },
  mounted () {
    this.getAllTeams()
  },
  methods: {
    getAllTeams () {
      const self = this
      api.getAllTeamList().then(data => {
        self.addAttrForTeams(data)
      })
    },
    handleTitle (e, team) {
      const { className } = e.target
      const { id, joined } = team
      const isTitle = className.split(' ').indexOf('team-title') !== -1
      if (!isTitle) return
      if (joined) {
        curMessage && curMessage.close()
        this.$router.push({
          name: 'teamsPrjList',
          params: { teamId: id }
        })
      } else {
        curMessage = Message.warning({
          message: '你还未加入该团队'
        })
      }
    },
    joinIt (team) {
      const { id } = team
      api.joinIntoTeam(id).then(data => {
        if (data) {
          team.joined = true
          this.joinedTeams.push(team)
        }
      })
    },
    quitIt (team) {
      const { id } = team
      api.quitFromTeam(id).then(data => {
        if (data) {
          team.joined = false
          this.joinedTeams = this.joinedTeams.filter(item => {
            return item.joined
          })
        }
      })
    },
    addAttrForTeams (res) {
      let staredTeams = []
      let joinedTeams = []
      const starItems = this.starItems
      if (res && res.length) {
        for (let i = 0, len = res.length; i < len; i++) {
          // 已星标
          for (let j = 0; j < starItems.length; j++) {
            if (res[i]['id'] === starItems[j]) {
              res[i].stared = true
              staredTeams.push(res[i])
              continue
            }
          }

          if (!res[i].joined) {
            res[i].joined = false
          } else { // 已加入团队
            joinedTeams.push(res[i])
          }
        }
        this.allTeams = res
        this.joinedTeams = joinedTeams
        this.staredTeams = staredTeams
      }
    },
    joinOrExit (team) {
      const { joined } = team
      this[joined ? 'quitIt' : 'joinIt'](team)
    },
    // 星标 || 取消星标
    stared (team) {
      const { stared, id } = team
      const { dispatch } = this.$store
      if (stared) {
        const index = this.staredTeams.indexOf(team)
        dispatch('teams/unStarItem', id)
        this.staredTeams.splice(index, 1)
      } else {
        dispatch('teams/starItem', id)
        const len = this.staredTeams.length
        this.staredTeams.push(team)
      }
      team.stared = !team.stared
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
.team-card-row {
  padding-top: 20px;
}

.team-card-col {
  margin-bottom: 32px;
}

.team-card-header {
  padding: 8px;
  border-bottom: 1px solid #d1dbe5;
}

.team-card-title {
  .icon {
    display: none;
    cursor: pointer;
  }
  &:hover .icon {
    display: inline-block;
  }
}

.team-card-bottom {
  padding: 8px;
  text-align: right;
}

.team-card-des {
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #aaa;
}

.team-card-title {
  line-height: 32px;
  font-size: 16px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.team-card-ipt {
  height: 32px;
}

.main-container-panel {
  box-sizing: border-box;
  padding: 0 5%;
  color: #475669;
}
.fs-nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teams-wrap{
  padding-top: 24px;
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &:hover{
      .edit-icon{
        opacity: 1;
      }
    }
  }
  .edit-icon{
    padding-top: 6px;
    opacity: 0;
    transition: opacity .4s;
    cursor: pointer;
  }
  .el-icon-star-off {
    opacity: 0;
  }
  .star-icon{
    color: #FFAF38;
    font-size: 16px;
    padding-top: 2px;
    transition: opacity .4s;
    cursor: pointer;
  }
  .team-title{
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    width: 178px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
  .team-content{
    height: 40px;
    margin-top: 8px;
  }
  .team-footer{
    text-align: right;
  }
  .team-button{
    transition: all .5s;
  }
}
.teams-stared-list, .teams-joined-list, .teams-all-list{
  & > div{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
  }
}
.teams-item{
  // display: inline-block;
  transition: all 1s;
  height: 128px;
  width: 254px;
  border-radius: 4px;
  background-color: #e1e1e1;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 8px 16px 16px;
  &:hover{
    transition: all .2s;
    transform: translateY(-5px);
    box-shadow: 0 7px 21px rgba(56, 56, 56, 0.15);
    .el-icon-star-off{
      opacity: 1;
    }
  }
}
.teams-item-enter, .teams-item-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.teams-item-leave-active {
  position: absolute;
}
</style>
