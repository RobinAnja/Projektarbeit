package hello.controller;

import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan("hello")
public class AppConfig implements WebMvcConfigurer {
	 @Bean
	    public UrlBasedViewResolver viewResolver() {
	        UrlBasedViewResolver resolver
	          = new UrlBasedViewResolver();
	        resolver.setPrefix("/webapp/WEB-INF/view/");
	        resolver.setSuffix(".jsp");
	        resolver.setViewClass(JstlView.class);
	        return resolver;
	    }
	 
	 @Bean
	 public CookieLocaleResolver cookieLocaleResolverExample() {
	     CookieLocaleResolver localeResolver 
	       = new CookieLocaleResolver();
	     localeResolver.setDefaultLocale(Locale.GERMAN);
	     localeResolver.setCookieName("locale-cookie-resolver-example");
	     localeResolver.setCookieMaxAge(3600);
	     return localeResolver;
	 }
	  
	 @Bean
	 public SessionLocaleResolver sessionLocaleResolver() { 
	     SessionLocaleResolver localeResolver = new SessionLocaleResolver(); 
	     localeResolver.setDefaultLocale(Locale.GERMANY); 
	     localeResolver.setDefaultTimeZone(TimeZone.getTimeZone("UTC"));
	     return localeResolver; 
	 }
	 
	 @Override
	 public void addResourceHandlers(ResourceHandlerRegistry registry) {
	     registry.addResourceHandler("/resources/**")
	       .addResourceLocations("/", "/resources/")
	       .setCachePeriod(3600)
	       .resourceChain(true)
	       .addResolver(new PathResourceResolver());
	 }
	/*  
	 @Bean
	 public ResourceBundleThemeSource themeSource() {
	     ResourceBundleThemeSource themeSource
	       = new ResourceBundleThemeSource();
	     themeSource.setDefaultEncoding("UTF-8");
	     themeSource.setBasenamePrefix("themes.");
	     return themeSource;
	 }
	 
	 @Bean
	 public CookieThemeResolver themeResolver() {
	     CookieThemeResolver resolver = new CookieThemeResolver();
	     resolver.setDefaultThemeName("example");
	     resolver.setCookieName("example-theme-cookie");
	     return resolver;
	 }
	  
	 @Bean
	 public ThemeChangeInterceptor themeChangeInterceptor() {
	    ThemeChangeInterceptor interceptor
	      = new ThemeChangeInterceptor();
	    interceptor.setParamName("theme");
	    return interceptor;
	 }
	  
	 @Override
	 public void addInterceptors(InterceptorRegistry registry) {
	     registry.addInterceptor(themeChangeInterceptor());
	 }
	 */

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addFormatters(FormatterRegistry registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Validator getValidator() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MessageCodesResolver getMessageCodesResolver() {
		// TODO Auto-generated method stub
		return null;
	}
	 
}
