package ToDo_backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepo extends JpaRepository<ToDo, Long> {

}
