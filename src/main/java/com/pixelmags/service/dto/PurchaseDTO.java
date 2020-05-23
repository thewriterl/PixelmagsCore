package com.pixelmags.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import com.pixelmags.domain.enumeration.PurchaseType;

/**
 * A DTO for the {@link com.pixelmags.domain.Purchase} entity.
 */
public class PurchaseDTO implements Serializable {
    
    private Long id;

    private LocalDate date;

    private PurchaseType tipo;


    private Long subscriptionId;
    
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

    public PurchaseType getTipo() {
        return tipo;
    }

    public void setTipo(PurchaseType tipo) {
        this.tipo = tipo;
    }

    public Long getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(Long subscriptionPlanId) {
        this.subscriptionId = subscriptionPlanId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseDTO)) {
            return false;
        }

        return id != null && id.equals(((PurchaseDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", subscriptionId=" + getSubscriptionId() +
            "}";
    }
}
