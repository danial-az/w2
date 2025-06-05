package ir.hamgit.formbuilder.dataModel;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.*;

@Entity
@Table(name = "forms")
@Setter
@ToString
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Form {
    @Id @GeneratedValue
    private Long id;

    private String title;

    private String description;

    private boolean published;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Question> questions = new ArrayList<>();
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Form form = (Form) o;
        return id != null && Objects.equals(id, form.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

