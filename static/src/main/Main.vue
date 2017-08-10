<template>
  <div class="main-container-panel">
     <edit-team ref="edit-item" :team="selectedTeam" @edit-success="handleEditSuccess"></edit-team>
    <div class="teams-wrap">
      <h2>星标团队</h2>
      <div class="teams-stared-list">
        <transition-group
          tag="div"
          name="teams-item"
        >
          <div class="teams-item" v-for="team in staredTeams" :key="team.id">
            <div class="teams-item-inner">
              <img class="teams-item-img" :src="team.imgId ? `/image/data?imgId=${team.imgId}` : team.imgUrl" alt="">
              <div class="header">
                <p class="team-title" @click="handleTitle($event, team)">{{team.name}}</p>
                <i class="star-icon el-icon-star-on" @click="stared(team)"></i>
              </div>
              <div class="team-content">
                <div class="left">{{team.description}}</div>
                <div class="right">
                  <i class="team-content-icon el-icon-edit" @click="editTeam(team)"></i>
                  <i class="team-content-icon el-icon-delete2" @click="deleteTeam(team)"></i>
                </div>
              </div>
              <div class="team-footer">
                <el-button class="team-button" :type="team.joined ? '' : 'primary'" size="mini" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
              </div>
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
            <div class="teams-item-inner">
              <img class="teams-item-img" :src="team.imgId ? `/image/data?imgId=${team.imgId}` : team.imgUrl" alt="">
              <div class="header">
                <p class="team-title">
                  <span class="fs-nowrap team-title">{{team.name}}</span>
                </p>
                <i class="star-icon" :class="team.stared ? 'el-icon-star-on' : 'el-icon-star-off'" @click="stared(team)"></i>
              </div>
              <div class="team-content">
                <div class="left">{{team.description}}</div>
                <div class="right">
                  <i class="team-content-icon el-icon-edit" @click="editTeam(team)"></i>
                  <i class="team-content-icon el-icon-delete2" @click="deleteTeam(team)"></i>
                </div>
              </div>
              <div class="team-footer">
                <el-button :type="team.joined ? '' : 'primary'" size="mini" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="teams-wrap">
      <h2>所有团队</h2>
      <div class="teams-all-list">
        <transition-group
          tag="span"
          name="teams-item"
        >
          <div class="teams-item" v-for="team in allTeams" :key="team.id">
            <div class="teams-item-inner">
              <img class="teams-item-img" :src="team.imgId ? `/image/data?imgId=${team.imgId}` : team.imgUrl" alt="">
              <div class="header">
                <p class="team-title">
                  <span class="fs-nowrap team-title">{{team.name}}</span>
                </p>
                <i class="star-icon" :class="team.stared ? 'el-icon-star-on' : 'el-icon-star-off'" @click="stared(team)"></i>
              </div>
              <div class="team-content">
                <div class="left">{{team.description}}</div>
                <div class="right">
                  <i class="team-content-icon el-icon-edit" @click="editTeam(team)"></i>
                  <i class="team-content-icon el-icon-delete2" @click="deleteTeam(team)"></i>
                </div>
              </div>
              <div class="team-footer">
                <el-button :type="team.joined ? '' : 'primary'" size="mini" @click="joinOrExit(team)">{{team.joined ? '退出' : '加入'}}</el-button>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="teams-add-item" @click="addTeam">
          <i class="el-icon-plus img-uploader-icon"></i>
        </div>
      </div>
    </div>
    <add-team ref="add-item" @add-success="handleAddSuccess"></add-team>
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
  Message,
  MessageBox
} from 'element-ui'
import EditTeam from './EditTeam.vue'
import AddTeam from './AddTeam.vue'

let imgUrls = []
for (let i = 0; i < 10; i++) {
  imgUrls.push(require(`./imgs/p${i + 1}.jpg`))
}

let curMessage

export default {
  name: 'Main',
  components: {
    ElRow: Row,
    ElCol: Col,
    ElCard: Card,
    ElButton: Button,
    ElInput: Input,
    EditTeam,
    AddTeam
  },
  data () {
    return {
      teams: [],
      staredTeams: [],
      joinedTeams: [],
      allTeams: [],
      showAdd: false,
      selectedTeam: {}
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
    getRandomImg (team) {
      const { updateTime, imgUrl } = team
      if (updateTime) {
        const key = updateTime.toString().substr(-1)
        return imgUrls[key]
      } else {
        return imgUrls[9]
      }
    },
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
          // 无图片的随机一张图片
          // TODO
          if (!res[i].imgUrl) res[i].imgUrl = this.getRandomImg(res[i])
          // res[i].[imgUrl]
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
    addTeam () {
      this.$refs['add-item'].dialogVisible = true
    },
    editTeam (team) {
      const { joined } = team
      if (joined) {
        this.selectedTeam = team
        this.$refs['edit-item'].dialogVisible = true
      } else {
        curMessage = Message.warning({
          message: '你还未加入该团队'
        })
      }
    },
    handleEditSuccess (team) {
      let editedTeam = this.allTeams.filter(item => item.id === team.id)[0]
      editedTeam.name = team.name
      editedTeam.description = team.description
      editedTeam.imgId = team.imgId
    },
    handleAddSuccess (team) {
      this.allTeams.push(team)
      this.joinedTeams.push(team)
    },
    deleteTeam (team) {
      const { joined } = team
      const { dispatch } = this.$store
      if (!joined) {
        curMessage = Message.warning({
          message: '你还未加入该团队'
        })
        return
      }
      MessageBox.confirm('此操作将永久删除该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delTeam(team.id).then(res => {
          const { code } = res
          if (code === 200) {
            const staredIndex = this.staredTeams.indexOf(team)
            const joinedIndex = this.joinedTeams.indexOf(team)
            const allIndex = this.allTeams.indexOf(team)
            if (staredIndex > 0) {
              dispatch('teams/unStarItem', team.id)
              this.staredTeams.splice(staredIndex, 1)
            }
            if (joinedIndex > 0) {
              this.joinedTeams.splice(joinedIndex, 1)
            }
            if (allIndex > 0) {
              this.allTeams.splice(allIndex, 1)
            }
          }
        }).catch(() => {})
      }).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped >
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
    height: 52px;
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .left {
      width: 198px;
    }
    .right {
      width: 20px;
      font-size: 14px;
      text-align: right;
    }
  }
  .team-content-icon{
    opacity: 0;
    margin-bottom: 8px;
    transition: all .2s;
    cursor: pointer;
  }
  .team-footer{
    text-align: right;
  }
  .team-button{
    transition: all .5s;
  }
}
.teams-stared-list, .teams-joined-list{
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
  transition: all .8s;
  margin-right: 24px;
  margin-bottom: 24px;
  float: left;
  :hover {
    .team-content-icon{
      opacity: 1;
    }
  }
}
.teams-item-img{
  position: absolute;
  z-index: -1;
  opacity: .4;
  left: 0;
  top: 0;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  transition: all .2s;
}
.teams-item-inner{
  height: 128px;
  width: 254px;
  padding: 8px 14px 12px;
  border-radius: 4px;
  transition: all .2s;
  position: relative;
  &:hover{
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
.teams-add-item{
  float: left;
  width: 254px;
  height: 128px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  line-height: 128px;
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  color: #8c939d;
  transition: color, border .2s;
  &:hover {
    color: #828282;
    border-color: #20a0ff;
    .el-icon-close {
      display: block;
    }
  }
}
</style>
