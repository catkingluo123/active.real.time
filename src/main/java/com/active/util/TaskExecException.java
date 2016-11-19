package com.active.util;

/**
 * Created by chenran on 2015/12/17 0017.
 */
public class TaskExecException extends RuntimeException{

    public TaskExecException() {
        super();
    }

    public TaskExecException(String message) {
        super(message);
    }

    public TaskExecException(Throwable cause) {
        super(cause);
    }

    public TaskExecException(String message, Throwable cause) {
        super(message, cause);
    }

    protected TaskExecException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
