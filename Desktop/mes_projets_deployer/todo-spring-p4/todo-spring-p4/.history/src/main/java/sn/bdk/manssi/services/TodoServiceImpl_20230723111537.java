package sn.bdk.manssi.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.bdk.manssi.model.Todo;
import sn.bdk.manssi.repository.TodoRepo;

import java.io.UnsupportedEncodingException;
import java.util.Collection;


@RequiredArgsConstructor
@Service
@Transactional
public class TodoServiceImpl implements TodoService {

    private final TodoRepo repo;
    @Override
    public Todo create(Todo alert) throws UnsupportedEncodingException {
        return repo.save(alert);
    }

    @Override
    public Collection<Todo> list() {
        return repo.findAll();
    }

    @Override
    public Boolean delete(Long id) {
        repo.deleteById(id);
        return Boolean.TRUE;
    }

}
