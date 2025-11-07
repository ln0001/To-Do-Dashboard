package ToDo_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private final ToDoRepo repo;

    public ToDoService(ToDoRepo repo) {
        this.repo = repo;
    }

    public List<ToDo> getAll() {
        return repo.findAll();
    }

    public ToDo create(ToDo todo) {
        return repo.save(todo);
    }


    public ToDo getById(Long id) {
        return repo.getById(id);
    }

    public void deleteOne(Long id) {
        repo.deleteById(id);
    }

    public ToDo updateData(Long id, ToDo toDoData) {
        ToDo existing = getById(id);
        existing.setTitle(toDoData.getTitle());
        existing.setDescription(toDoData.getDescription());
        existing.setCompleted(toDoData.isCompleted());
        return repo.save(existing);
    }
}
