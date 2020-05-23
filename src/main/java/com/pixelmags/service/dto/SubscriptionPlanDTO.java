package com.pixelmags.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import com.pixelmags.domain.enumeration.SubscriptionPeriod;

/**
 * A DTO for the {@link com.pixelmags.domain.SubscriptionPlan} entity.
 */
public class SubscriptionPlanDTO implements Serializable {
    
    private Long id;

    private String nome;

    private BigDecimal preco;

    private SubscriptionPeriod periodo;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public SubscriptionPeriod getPeriodo() {
        return periodo;
    }

    public void setPeriodo(SubscriptionPeriod periodo) {
        this.periodo = periodo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubscriptionPlanDTO)) {
            return false;
        }

        return id != null && id.equals(((SubscriptionPlanDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubscriptionPlanDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", preco=" + getPreco() +
            ", periodo='" + getPeriodo() + "'" +
            "}";
    }
}
