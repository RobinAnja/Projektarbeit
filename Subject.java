package hello;

import javax.persistence.*;

@Entity
@Table(name = "Subject")
public class Subject {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="id", nullable = true)
    private Integer id;

    @Column(name="name", nullable = true)
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
