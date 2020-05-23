package com.pixelmags.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import com.pixelmags.domain.enumeration.Event;

/**
 * A DTO for the {@link com.pixelmags.domain.Log} entity.
 */
public class LogDTO implements Serializable {
    
    private Long id;

    private LocalDate date;

    private Event evento;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Event getEvento() {
        return evento;
    }

    public void setEvento(Event evento) {
        this.evento = evento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogDTO)) {
            return false;
        }

        return id != null && id.equals(((LogDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", evento='" + getEvento() + "'" +
            "}";
    }
}
