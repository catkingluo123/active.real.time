package com.active.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by chenran on 2016/3/11 0011.
 */
public class ConfigUtil {

    public static final Properties CONFIG_PROPS = new Properties();
    private static final Logger logger = LoggerFactory.getLogger(ConfigUtil.class);


    static{
        try {
            InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream("init.properties");
            CONFIG_PROPS.load(in);
        } catch (IOException e) {
            logger.error(e.getMessage(),e);
        }

    }
}
