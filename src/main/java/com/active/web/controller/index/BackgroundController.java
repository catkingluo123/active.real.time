package com.active.web.controller.index;

import com.active.common.entity.ResFormMap;
import com.active.common.entity.UserFormMap;
import com.active.common.entity.UserLoginFormMap;
import com.active.common.mapper.ResourcesMapper;
import com.active.common.mapper.UserLoginMapper;
import com.active.common.mapper.UserMapper;
import com.active.util.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 进行管理后台框架界面的类
 * 
 * @author lijianning 2015-04-05
 * @Email: mmm333zzz520@163.com
 * @version 3.0v
 */

@Controller
@RequestMapping("/")
public class BackgroundController extends BaseController {

	@Inject
	private ResourcesMapper resourcesMapper;

	@Inject
	private UserLoginMapper userLoginMapper;

	@Inject
	private UserMapper userMapper;

	public static final int APPID = 1194;

	public static final String LOGIN_KEY = "dhI]SIAnM9AKKEV8lq5ttH1gcN,fTVD[pyvTCkl8a4qr4u";

	private static Logger logger= LoggerFactory.getLogger(BackgroundController.class);

	/**
	 * @return
	 */
//	@RequestMapping(value = "login", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
//	public String login(HttpServletRequest request) {
//		String key = request.getParameter("key");
//		String sign_all = request.getParameter("sign_all");
//		String username = request.getParameter("username");
//		String work_id = request.getParameter("work_id");
//		if(Common.isNotEmpty(username) && Common.isNotEmpty(key)){
//			String inputString = username+work_id+key+LOGIN_KEY;
//			if(MD5Util.createmd5(inputString).equals(sign_all)){
//				UserFormMap userFormMap = new UserFormMap();
//				userFormMap.put("accountName",username);
//				userFormMap = userMapper.findUser(userFormMap);
//				if(userFormMap!=null){
//					String apiUrl = "https://apiht.37wan.com/server_requestdata.php?" +
//							"username=" + username +
//							"&key=" + key +
//							"&appid=" + APPID +
//							"&sign=" + MD5Util.createmd5(username+key+APPID+LOGIN_KEY);
//					String result = SendApi.send(apiUrl);
//					if(result.trim().equals("1")){
//						try{
//						Subject user = SecurityUtils.getSubject();
//						// 用户输入的账号和密码,,存到UsernamePasswordToken对象中..然后由shiro内部认证对比,
//						// 认证执行者交由ShiroDbRealm中doGetAuthenticationInfo处理
//						// 当以上认证成功后会向下执行,认证失败会抛出异常
//						UsernamePasswordToken token = new UsernamePasswordToken(username, "37hadoop");
//						try {
//							user.login(token);
//						} catch (LockedAccountException lae) {
//							token.clear();
//							request.setAttribute("error", "用户已经被锁定不能登录，请与管理员联系！");
//							return "/denied";
//						} catch (ExcessiveAttemptsException e) {
//							token.clear();
//							request.setAttribute("error", "账号：" + username + " 登录失败次数过多,锁定10分钟!");
//							return "/denied";
//						} catch (AuthenticationException e) {
//							e.printStackTrace();
//							token.clear();
//							request.setAttribute("error", "用户或密码不正确！");
//							return "/denied";
//						}
//
//						UserLoginFormMap userLogin = new UserLoginFormMap();
//						Session session = SecurityUtils.getSubject().getSession();
//
//						userLogin.put("userId", session.getAttribute("userSessionId"));
//						userLogin.put("accountName", username);
//						userLogin.put("loginIP", session.getHost());
//						userLoginMapper.addEntity(userLogin);
//						request.removeAttribute("error");
//					} catch (Exception e) {
//						e.printStackTrace();
//						request.setAttribute("error", "登录异常，请联系管理员！");
//						return "/denied";
//					}
//					return "redirect:index.shtml";
//					}else {
//						logger.error("登录状态已超时");
//					}
//				}else {
//					logger.error("用户不存在");
//				}
//			}else {
//				logger.error("md5验证不通过");
//			}
//		}else {
//			logger.error("参数为空");
//		}
//		return "/denied";
//	}


	@RequestMapping(value = "login", produces = "text/html; charset=utf-8")
	public String login(String username, String password, HttpServletRequest request) {
		try {
			/*if (!request.getMethod().equals("POST")) {
				request.setAttribute("error", "支持POST方法提交！");
			}*/
			if (Common.isEmpty(username) || Common.isEmpty(password)) {
				request.setAttribute("error", "用户名或密码不能为空！");
				return "/login";
			}
			// 想要得到 SecurityUtils.getSubject()　的对象．．访问地址必须跟shiro的拦截地址内．不然后会报空指针
			Subject user = SecurityUtils.getSubject();
			// 用户输入的账号和密码,,存到UsernamePasswordToken对象中..然后由shiro内部认证对比,
			// 认证执行者交由ShiroDbRealm中doGetAuthenticationInfo处理
			// 当以上认证成功后会向下执行,认证失败会抛出异常
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			try {
				user.login(token);
			} catch (LockedAccountException lae) {
				token.clear();
				request.setAttribute("error", "用户已经被锁定不能登录，请与管理员联系！");
				return "/login";
			} catch (ExcessiveAttemptsException e) {
				token.clear();
				request.setAttribute("error", "账号：" + username + " 登录失败次数过多,锁定10分钟!");
				return "/login";
			} catch (AuthenticationException e) {
//				e.printStackTrace();
				logger.debug("账号或密码输入不正确！");
				token.clear();
				request.setAttribute("error", "用户或密码不正确！");
				return "/login";
			}

			UserLoginFormMap userLogin = new UserLoginFormMap();
			Session session = SecurityUtils.getSubject().getSession();

			userLogin.put("userId", session.getAttribute("userSessionId"));
			userLogin.put("accountName", username);
			userLogin.put("loginIP", session.getHost());
			userLoginMapper.addEntity(userLogin);
			request.removeAttribute("error");
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("error", "登录异常，请联系管理员！");
			return "/login";
		}
		return "redirect:index.shtml";
	}

	/**
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("index")
	public String index(Model model) throws Exception {
		Session session = SecurityUtils.getSubject().getSession();
		String userId = String.valueOf(session.getAttribute("userSessionId"));
		if(Common.isEmpty(userId)){
//			return "/denied";
			return "/login";
		}
		UserFormMap userFormMap = new UserFormMap();
		userFormMap.put("id",userId);
		userFormMap = userMapper.getUserPost(userFormMap);
		if(userFormMap.get("postPicture") == null || userFormMap.get("postPicture").toString().equals("")){
			model.addAttribute("userName", userFormMap.get("userName").toString());
			model.addAttribute("postPicture","/images/post/system.png");
			model.addAttribute("userId",userId);
			model.addAttribute("roleKey",userFormMap.get("roleKey").toString());
		}else {
			model.addAttribute("userName", userFormMap.get("userName").toString());
			model.addAttribute("postPicture",userFormMap.get("postPicture").toString());
			model.addAttribute("userId",userId);
			model.addAttribute("roleKey",userFormMap.get("roleKey").toString());
		}
		List<ResFormMap> mps = resourcesMapper.findUserResourcess(userId);
		System.out.println("userId is " + userId + " logins successfully !!" +
				"\n" + " and attached res are " + mps);
		List<TreeObject> list = new ArrayList<TreeObject>();
		for (ResFormMap map : mps) {
			TreeObject ts = new TreeObject();
			Common.flushObject(ts, map);
			list.add(ts);
		}
		TreeUtil treeUtil = new TreeUtil();
		List<TreeObject> ns = treeUtil.getChildTreeObjects(list, 0);
		model.addAttribute("list", ns);
//		return Common.BACKGROUND_PATH +"/system/statistics/list";
		return "/index";
	}


	@RequestMapping("menu")
	public String menu(Model model) {
		return "/framework/menu";
	}

	/**
	 * 获取某个用户的权限资源
	 * 
	 * @author lijianning Email：mmm333zzz520@163.com date：2014-3-4
	 * @param request
	 * @return
	 */
	@RequestMapping("findAuthority")
	@ResponseBody
	public List<String> findAuthority(HttpServletRequest request) {
		return null;
	}

	@RequestMapping("download")
	public void download(String fileName, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		response.setContentType("text/html;charset=utf-8");
		request.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		String ctxPath = request.getSession().getServletContext().getRealPath("/") + "\\"
				+ "filezip\\";
		String downLoadPath = ctxPath + fileName;
		System.out.println(downLoadPath);
		try {
			long fileLength = new File(downLoadPath).length();
			response.setContentType("application/x-msdownload;");
			response.setHeader("Content-disposition",
					"attachment; filename=" + new String(fileName.getBytes("utf-8"), "ISO8859-1"));
			response.setHeader("Content-Length", String.valueOf(fileLength));
			bis = new BufferedInputStream(new FileInputStream(downLoadPath));
			bos = new BufferedOutputStream(response.getOutputStream());
			byte[] buff = new byte[2048];
			int bytesRead;
			while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
				bos.write(buff, 0, bytesRead);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (bis != null)
				bis.close();
			if (bos != null)
				bos.close();
		}
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout() {
		// 使用权限管理工具进行用户的退出，注销登录
		SecurityUtils.getSubject().logout(); // session
												// 会销毁，在SessionListener监听session销毁，清理权限缓存
		return "redirect:login.shtml";
	}

	@ResponseBody
	@RequestMapping({ "lanyuan" })
	public void lanyuan(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("application/x-javascript;charset=UTF-8");
		PrintWriter out = response.getWriter();
		String s = request.getParameter("callback");
		out.println(s + "({\"msg\":\"false\"})");
		out.close();
	}

	@RequestMapping("install")
	public String install() throws Exception {

		try {
			/*Properties props = Resources.getResourceAsProperties("jdbc.properties");
			String url = props.getProperty("jdbc.url");
			String driver = props.getProperty("jdbc.driverClass");
			String username = props.getProperty("jdbc.username");
			String password = props.getProperty("jdbc.password");
			System.out.println(url);
			Class.forName(driver).newInstance();
			Connection conn = (Connection) DriverManager.getConnection(url, username, password);
			ScriptRunner runner = new ScriptRunner(conn);
			runner.setErrorLogWriter(null);
			runner.setLogWriter(null);
			runner.runScript(Resources.getResourceAsReader("intall.sql"));*/

		} catch (Exception e) {
			e.printStackTrace();
			return "初始化失败！请联系管理员" + e;
		}

		return "redirect:login.shtml";
	}

}
