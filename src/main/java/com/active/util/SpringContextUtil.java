package com.active.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

/**
 * Created by chenran on 2015/11/20 0020.
 */

@Component
@Lazy(false)
public class SpringContextUtil implements ApplicationContextAware{


    private static ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContextParam) throws BeansException {
        System.out.println("step into the SpringContextUtil ============================= ");
        SpringContextUtil.applicationContext = applicationContextParam;
    }

    private static  boolean checkApplicationContext(){
        if(applicationContext == null){
            throw new IllegalArgumentException("applicationContext 未成功注入！！！！！！");
        }
        return applicationContext != null;
    }

    public static ApplicationContext getApplicationContext(){
        checkApplicationContext();
        return applicationContext;
    }


    public static<T> Object getBean(String beanName){
        checkApplicationContext();
        return (T) applicationContext.getBean(beanName);
    }

    public static ApplicationContext getCtx(){
        return applicationContext;
    }
}
