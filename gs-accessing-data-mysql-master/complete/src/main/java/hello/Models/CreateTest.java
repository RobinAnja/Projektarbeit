package hello.Models;

import javax.persistence.*;

@Entity
@Table(name = "CreateTest")
public class CreateTest {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Integer id;

    @Column(name="test", nullable = false)
    private int [] test;




    public Integer getId() {
        return id;
    }

    public int[] getTest() {
        return test;
    }

    public void setTest(int[] test) {
        this.test = test;
    }

    public void setId(Integer id) {
        this.id = id;
    }


}