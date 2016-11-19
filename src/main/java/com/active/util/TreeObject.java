package com.active.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 这个是列表树形式显示的实体,
 * 这里的字段是在前台显示所有的,可修改
 * @author lanyuan
 * Email：mmm333zzz520@163.com
 * date：2014-11-20
 */
public class TreeObject {
	private Integer id;
	private Integer parentId;
	private String name;
	private String parentName;
	private String resKey;
	private String resUrl;
	private Integer level;
	private String type;
	private String description;
	private String icon;
	private Integer ishide;
	private List<TreeObject> children = new ArrayList<TreeObject>();
	//增加的为了显示HiveMetaObject
	private Integer dbsId;
	private String dbsName;		//数据源名称
	private Integer dbId;
	private String dbName;

	private Integer tbId;
	private String tbName;
	private Integer operationValue;

	public String getDbsName() {
		return dbsName;
	}

	public void setDbsName(String dbsName) {
		this.dbsName = dbsName;
	}

	public Integer getDbsId() {
		return dbsId;
	}

	public void setDbsId(Integer dbsId) {
		this.dbsId = dbsId;
	}

	public Integer getDbId() {
		return dbId;
	}

	public void setDbId(Integer dbId) {
		this.dbId = dbId;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public Integer getTbId() {
		return tbId;
	}

	public void setTbId(Integer tbId) {
		this.tbId = tbId;
	}

	public String getTbName() {
		return tbName;
	}

	public void setTbName(String tbName) {
		this.tbName = tbName;
	}

	public Integer getOperationValue() {
		return operationValue;
	}

	public void setOperationValue(Integer operationValue) {
		this.operationValue = operationValue;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public List<TreeObject> getChildren() {
		return children;
	}
	public void setChildren(List<TreeObject> children) {
		this.children = children;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentName() {
		return parentName;
	}
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	public String getResKey() {
		return resKey;
	}
	public void setResKey(String resKey) {
		this.resKey = resKey;
	}
	public String getResUrl() {
		return resUrl;
	}
	public void setResUrl(String resUrl) {
		this.resUrl = resUrl;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getIshide() {
		return ishide;
	}
	public void setIshide(Integer ishide) {
		this.ishide = ishide;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Override
	public String toString() {
		return "TreeObject{" +

				"dbId=" + dbId +
				", dbName='" + dbName + '\'' +
				", tbId=" + tbId +
				", tbName='" + tbName + '\'' +
				", operationValue=" + operationValue +
				", parentId=" + parentId +
				", children=" + children +
				'}';
	}
}
