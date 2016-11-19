package com.active.util;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by chenran on 2016/3/11 0011.
 */
public class AtomicMarker {


    private static AtomicInteger rid = new AtomicInteger();
    public static int getIncrement(){
        return rid.incrementAndGet();
    }
}
