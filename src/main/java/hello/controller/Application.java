package hello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages= {"hello"})
@EnableJpaRepositories(basePackages= {"hello.Repository"})
@EntityScan(basePackages= {"hello.Models"} )
public class Application extends SpringBootServletInitializer {

	 @Autowired
	    private ThymeleafProperties properties;

	    @Value("${spring.thymeleaf.templates_root:}")
	    private String templatesRoot;
	
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
/*
    @Bean
    public ITemplateResolver defaultTemplateResolver() {
        FileTemplateResolver resolver = new FileTemplateResolver();
        resolver.setSuffix(properties.getSuffix());
        resolver.setPrefix(templatesRoot);
        resolver.setTemplateMode(properties.getMode());
        resolver.setCacheable(properties.isCache());
        return resolver;
    }
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
 */
}
