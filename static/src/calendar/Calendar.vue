<template>
  <div id='calendar'></div>
</template>

<script>
require('fullcalendar/dist/fullcalendar.css')
require('fullcalendar/dist/fullcalendar.js')
require('jquery')

import api from './api.js'

export default{
  data () {
    return {
      events: [{
        id: '123',
        title: '123',
        start: '2017-07-07 20:00:00'
      }]
    }
  },
  mounted () {
    this.fullCalendar()
    api.getCalendarList((data) => {
      console.log(data)
    })
  },
  methods: {
    fullCalendar () {
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        firstDay: 1,
        aspectRatio: 1.5,
        timeFormat: 'H:mm',
        axisFormat: 'H:mm',
        events: this.events,
        eventClick: function (calEvent, jsEvent, view) {
          // 点击日程时间动作
        },
        eventMouseover: function (calEvent, jsEvent, view) {
          $(this).addClass('mouseover')
        },
        eventMouseout: function (calEvent, jsEvent, view) {
          $(this).removeClass('mouseover')
        }
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
