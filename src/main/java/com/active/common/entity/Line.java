package com.active.common.entity;

import java.util.List;

/**
 * Created by Administrator on 2016/11/20.
 */
public class Line {

    private List<String> legend;

    private List<String> xdata;

    private List<Ydata> ydata;


    public List<String> getLegend() {
        return legend;
    }

    public void setLegend(List<String> legend) {
        this.legend = legend;
    }

    public List<String> getXdata() {
        return xdata;
    }

    public void setXdata(List<String> xdata) {
        this.xdata = xdata;
    }

    public List<Ydata> getYdata() {
        return ydata;
    }

    public void setYdata(List<Ydata> ydata) {
        this.ydata = ydata;
    }
}
