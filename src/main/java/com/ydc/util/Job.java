//package com.ydc.util;
//
//import org.quartz.*;
//import org.springframework.scheduling.quartz.SchedulerFactoryBean;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
///**
//* Created by ydc on 2019/6/28.
//*/
//public class Job {
//
//    private SchedulerFactoryBean schedulerFactory;
//
//
//    @RequestMapping(value = "/addJob", method = RequestMethod.POST)
//    @ResponseBody
//    public Boolean addJob(@RequestParam String jobName, @RequestParam(required = false) String jobGroupName,
//                          @RequestParam String triggerName, @RequestParam(required = false) String triggerGroupName,
//                          @RequestParam Class jobClass, @RequestParam String cron) {
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            // 任务名，任务组，任务执行类
//            JobDetail jobDetail = JobBuilder.newJob(jobClass).withIdentity(jobName, jobGroupName).build();
//
//            // 触发器
//            TriggerBuilder<Trigger> triggerBuilder = TriggerBuilder.newTrigger();
//            // 触发器名,触发器组
//            triggerBuilder.withIdentity(triggerName, triggerGroupName);
//            triggerBuilder.startNow();
//            // 触发器时间设定
//            triggerBuilder.withSchedule(CronScheduleBuilder.cronSchedule(cron));
//            // 创建Trigger对象
//            CronTrigger trigger = (CronTrigger) triggerBuilder.build();
//
//            // 调度容器设置JobDetail和Trigger
//        try {
//            scheduler.scheduleJob(jobDetail, trigger);
//            // 启动
//            if (!scheduler.isShutdown()) {
//                scheduler.start();
//            }
//            return true;
//        } catch (SchedulerException e) {
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    @RequestMapping(value = "/modifyJobTime", method = RequestMethod.POST)
//    @ResponseBody
//    public Boolean modifyJobTime(@RequestParam String jobName,
//                                 @RequestParam(required = false) String jobGroupName,
//                                 @RequestParam String triggerName,
//                                 @RequestParam(required = false) String triggerGroupName,
//                                 @RequestParam String cron) {
//        try {
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            TriggerKey triggerKey = TriggerKey.triggerKey(triggerName, triggerGroupName);
//            CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);
//            if (trigger == null) {
//                return false;
//            }
//
//            String oldTime = trigger.getCronExpression();
//            if (!oldTime.equalsIgnoreCase(cron)) {
//                /** 方式一 ：调用 rescheduleJob 开始 */
//                // 触发器
//                TriggerBuilder<Trigger> triggerBuilder = TriggerBuilder.newTrigger();
//                // 触发器名,触发器组
//                triggerBuilder.withIdentity(triggerName, triggerGroupName);
//                triggerBuilder.startNow();
//                // 触发器时间设定
//                triggerBuilder.withSchedule(CronScheduleBuilder.cronSchedule(cron));
//                // 创建Trigger对象
//                trigger = (CronTrigger) triggerBuilder.build();
//                // 方式一 ：修改一个任务的触发时间
//                scheduler.rescheduleJob(triggerKey, trigger);
//                /** 方式一 ：调用 rescheduleJob 结束 */
//
//                /** 方式二：先删除，然后在创建一个新的Job  */
//                //JobDetail jobDetail = scheduler.getJobDetail(JobKey.jobKey(jobName, jobGroupName));
//                //Class<? extends Job> jobClass = jobDetail.getJobClass();
//                //removeJob(jobName, jobGroupName, triggerName, triggerGroupName);
//                //addJob(jobName, jobGroupName, triggerName, triggerGroupName, jobClass, cron);
//                /** 方式二 ：先删除，然后在创建一个新的Job */
//                return true;
//            }
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        return false;
//    }
//
//    @RequestMapping(value = "/removeJob", method = RequestMethod.DELETE)
//    @ResponseBody
//    public Boolean removeJob(@RequestParam String jobName, @RequestParam(required = false) String jobGroupName,
//                             @RequestParam String triggerName, @RequestParam(required = false) String triggerGroupName) {
//        try {
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            TriggerKey triggerKey = TriggerKey.triggerKey(triggerName, triggerGroupName);
//            scheduler.pauseTrigger(triggerKey);// 停止触发器
//            scheduler.unscheduleJob(triggerKey);// 移除触发器
//            scheduler.deleteJob(JobKey.jobKey(jobName, jobGroupName));// 删除任务
//            return true;
//        } catch (Exception ignored) {
//
//        }
//        return false;
//    }
//
//    public void startJobs() {
//        try {
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            scheduler.start();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    public void shutdownJobs() {
//        try {
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            if (!scheduler.isShutdown()) {
//                scheduler.shutdown();
//            }
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//}
