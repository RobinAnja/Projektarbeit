package hello.controller;


	import javax.servlet.ServletContext;
	import javax.servlet.ServletException;
	import javax.servlet.ServletRegistration;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.WebApplicationInitializer;
	import org.springframework.web.context.ContextLoaderListener;
	import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
	import org.springframework.web.servlet.DispatcherServlet;

	
	public class AppInitializer implements WebApplicationInitializer{


	    @Autowired
	    public void onStartup(ServletContext servletCon) throws ServletException {
	        // TODO Auto-generated method stub
	    	AnnotationConfigWebApplicationContext ac = new AnnotationConfigWebApplicationContext();
	        ac.register(AppConfig.class);
	        ac.refresh();

	        // Create and register the DispatcherServlet
	        DispatcherServlet servlet = new DispatcherServlet(ac);
	        ServletRegistration.Dynamic registration = ((ServletContext) servlet).addServlet("app", servlet);
	        registration.setLoadOnStartup(1);
	        registration.addMapping("/app/*");
	    }

	}
