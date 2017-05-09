<template>
  <div class="container-panel">
    <div class="teams-panel">
      <div class="team-item" :class="{joined: team.joined}" v-for="team in teams" @click="goDetail(team.joined)">
        <p class="team-label title">{{team.name}}</p>
        <p class="team-label">{{team.description}}</p>

        <p class="team-add" v-if="!team.joined" @click="join(team.id)">加入</p>
        <p class="team-add gray" v-if="!team.joined"></p>

        <p class="team-quit" v-if="team.joined" @click="quit(team.id)">退出</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './api.js'
  export default {
    name: 'Main',
    data () {
      return {
        teams: []
      }
    },
    mounted () {
      this.getAllTeams()
    },
    methods: {
      getAllTeams () {
        const self = this
        api.getAllTeamList(function (res) {
          self.teams = res
        })
      },
      goDetail (isJoin) {
        if (!isJoin) return
        window.location.href = window.pageConfig.siteUrl + 'teams/'
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
      }
    }
  }
</script>

<style lang="less" scoped >
.container-panel {
  box-sizing: border-box;
  padding: 0 5%;
  color: #475669;
  .teams-panel {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .team-item {
    position: relative;
    width: 150px;
    height: 150px;
    border: 1px solid #eee;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    text-align: left;
    cursor: pointer;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.06);
    &.joined {
      box-shadow: 0 2px 10px 0 rgba(179, 229, 252, 0.5);
    }
  }
  .team-item:hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    &.joined {
      box-shadow: 0 2px 10px 0 rgba(179, 229, 252, 0.9);
      .team-quit {
        display: inline-block;
      }
    }
    .team-add {
      display: inline;
    }
    .gray {
      display: none;
    }
  }

  .team-label {
    margin: 0;
    color: #999;
    padding: 5px;
    &.title {
      font-size: 14px;
    }
  }
  .team-add {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0;
    line-height: 150px;
    font-size: 14px;
    color: #fff;
    border-radius: 6px;
    background-color: rgba(251, 140, 0, .5);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    display: none;

    &.gray {
      background-color: rgba(224, 224, 224, .5);
      display: block;
    }
  }
  .team-quit {
    position: absolute;
    margin: 5px;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #E0F7FA;
    text-align: center;
    color: #00BCD4;
    cursor: pointer;
    display: none;
  }
}
</style>
