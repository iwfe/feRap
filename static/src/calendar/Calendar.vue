<template>
  <div id='calendar'></div>
</template>

<script>
require('fullcalendar/dist/fullcalendar.css')
require('fullcalendar/dist/fullcalendar.js')
require('jquery')
require('../plugins/jquery.qtip.min.css')
require('../plugins/jquery.qtip.min.js')

import api from './api.js'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      events: []
    }
  },
  mounted () {
    this.getcalendarList()
  },
  computed: {
    ...mapGetters({
      expendedNodes: 'teams/expendedNodes'
    })
  },
  methods: {
    async getcalendarList () {
      await api.getcalendarList((res) => {
        if (res) {
          res.map((item) => {
            const title = `${item.projectName}${item.name}`
            this.manage(`${title}_上线阶段`, item.onlineTime, item)
            this.manage(`${title}_提测阶段`, item.testTime, item)
          })
        }
        this.fullCalendar(this.events)
      })
    },
    fullCalendar (events) {
      let self = this
      const initialLocaleCode = 'zh-cn'
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        firstDay: 1,
        aspectRatio: 1.5,
        timeFormat: 'H:mm',
        locale: initialLocaleCode,
        events: events,
        editable: true,
        eventLimit: true,
        eventRender: function (event, element) {
          element.qtip({
            content: event.description,
            show: 'mouseover',
            hide: {
              event: 'click mouseleave', // click防止用$router跳转还存在提示
              delay: 0
            }
          })
        },
        eventMouseover: function (calEvent, jsEvent, view) {
          $(this).addClass('mouseover')
        },
        eventMouseout: function (calEvent, jsEvent, view) {
          $(this).removeClass('mouseover')
        },
        eventClick: function (calEvent, jsEvent, view) {
          self.$router.push({name: 'teamsApiList', 
            params: {'teamId': calEvent.teamId, 'projectId': calEvent.projectId, 'prdId': calEvent.Id}})
        }
      })
    },
    manage (title, time, item) {
      const data = new Date(time)
      const year = data.getFullYear()
      const month = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1
      const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
      const hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
      const minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
      const seconds = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
      const eventTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
      this.events.push({
        Id: item.id,
        projectId: item.projectId,
        teamId: item.teamId,
        title: title,
        start: eventTime,
        description: `${title} 时间：${eventTime}`
      })
    }
  }
}
</script>

<style>
  #calendar{
    width: 90%;
    margin: 30px auto;
  }
  .mouseover{
    color: lightblue !important;
    background: #fcf8e3 !important;
  }
</style>
