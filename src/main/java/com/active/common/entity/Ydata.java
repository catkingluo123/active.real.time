package com.active.common.entity;

import java.util.List;
/**
 * Created by Administrator on 2016/11/20.
 */
public class Ydata {

    private String name;
    private String type;
    private List<String> data;

    public Ydata(String type){
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getData() {
        return data;
    }

    public void setData(List<String> data) {
        this.data = data;
    }
}
