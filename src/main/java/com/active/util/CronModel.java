package com.active.util;

import java.sql.Timestamp;

/**
 * Created by chenran on 2015/12/14 0014.
 */
public class CronModel {

    private String id;
    private String jobName;
    private String jobDescript;
    private String cronName;
    private String cronExpression;
    private Timestamp lastCreateTime;
    private Timestamp lastRunTime;


    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        CronModel other = (CronModel)obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id)) {
            return false;
        }
        if (this.cronName == null) {
            if (other.cronName != null)
                return false;
        }
        else if (!this.cronName.equals(other.cronName)) {
            return false;
        }
        if (this.cronExpression == null) {
            if (other.cronExpression != null)
                return false;
        }
        else if (!this.cronExpression.equals(other.cronExpression)) {
            return false;
        }
        return true;
    }

    public String getJobDescript() {
        return jobDescript;
    }

    public void setJobDescript(String jobDescript) {
        this.jobDescript = jobDescript;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getCronExpression() {
        return cronExpression;
    }

    public void setCronExpression(String cronExpression) {
        this.cronExpression = cronExpression;
    }

    public String getCronName() {
        return cronName;
    }

    public void setCronName(String cronName) {
        this.cronName = cronName;
    }



    public Timestamp getLastCreateTime() {
        return lastCreateTime;
    }

    public void setLastCreateTime(Timestamp lastCreateTime) {
        this.lastCreateTime = lastCreateTime;
    }

    public Timestamp getLastRunTime() {
        return lastRunTime;
    }

    public void setLastRunTime(Timestamp lastRunTime) {
        this.lastRunTime = lastRunTime;
    }
}
