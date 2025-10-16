/**
 * @author      Boubacar Demba Mandiang
 * @copyright   Copyright (c) 2023,  Banque de Dakar Département Sécurité
 * @license     Logiciel privé sans licence
 */
package sn.bdk.manssi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.bdk.manssi.models.Todo;

import java.util.Collection;

public interface TodoRepo extends JpaRepository<Todo, Long> {
}

