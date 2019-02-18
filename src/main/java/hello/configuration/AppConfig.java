package hello.configuration;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties.LocaleResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ui.context.support.ResourceBundleThemeSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.theme.CookieThemeResolver;
import org.springframework.web.servlet.theme.ThemeChangeInterceptor;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.ResourceBundleViewResolver;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.XmlViewResolver;

import java.io.IOException;
import java.util.Locale;
import java.util.TimeZone;

@Configuration
@EnableWebMvc
@ComponentScan("hello.configuration")
public class AppConfig implements WebMvcConfigurer {
	 @Bean
	    public UrlBasedViewResolver viewResolver() {
	        UrlBasedViewResolver resolver
	          = new UrlBasedViewResolver();
	        resolver.setPrefix("/webapp/WEB-INF/views/");
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
	 
}
