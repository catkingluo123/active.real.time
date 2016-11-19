package com.active.web.shiro;

import com.active.common.entity.ResFormMap;
import com.active.common.mapper.ResourcesMapper;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.config.Ini;
import org.springframework.beans.factory.FactoryBean;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 产生责任链，确定每个url的访问权限
 * 
 */
public class ChainDefinitionSectionMetaSource implements FactoryBean<Ini.Section> {

	@Inject
	private ResourcesMapper resourcesMapper;

	// 静态资源访问权限
	private String filterChainDefinitions = null;
	//系统启动时加载为shiro加载的统一拦截过滤部分
	public Ini.Section getObject() throws Exception {
		Ini ini = new Ini();
		// 加载默认的url
		ini.load(filterChainDefinitions);
		Ini.Section section = ini.getSection(Ini.DEFAULT_SECTION_NAME);
		// 循环Resource的url,逐个添加到section中。section就是filterChainDefinitionMap,
		// 里面的键就是链接URL,值就是存在什么条件才能访问该链接
		List<ResFormMap> lists = resourcesMapper.findByWhere(new ResFormMap());
		for (ResFormMap resources : lists) {
			// 构成permission字符串
			if (StringUtils.isNotEmpty(resources.get("resUrl") + "") && StringUtils.isNotEmpty(resources.get("resKey") + "")) {
				String permission = "perms[" + resources.get("resKey") + "]";
				// 不对角色进行权限验证
				// 如需要则 permission = "roles[" + resources.getResKey() + "]";
				section.put(resources.get("resUrl") + "", permission);
			}
		}

		// 所有资源的访问权限，必须放在最后
		section.put("/**", "authc");
		Set<Map.Entry<String,String>> entries = section.entrySet();
		System.out.println("系统启动时所有资源为：");
		for(Map.Entry<String,String> entry:entries){
			System.out.println("访问 " + entry.getKey() + " 需要 " + entry.getValue());
		}
		return section;
	}

	/**
	 * 通过filterChainDefinitions对默认的url过滤定义
	 * 
	 * @param filterChainDefinitions
	 *            默认的url过滤定义
	 */
	public void setFilterChainDefinitions(String filterChainDefinitions) {
		this.filterChainDefinitions = filterChainDefinitions;
	}

	public Class<?> getObjectType() {
		return this.getClass();
	}

	public boolean isSingleton() {
		return false;
	}
}
