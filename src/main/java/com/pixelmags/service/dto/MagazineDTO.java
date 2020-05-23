package com.pixelmags.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link com.pixelmags.domain.Magazine} entity.
 */
public class MagazineDTO implements Serializable {
    
    private Long id;

    private String codigoRevista;

    private BigDecimal preco;


    private Long issueId;

    private Long purchaseId;

    private Long publisherId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoRevista() {
        return codigoRevista;
    }

    public void setCodigoRevista(String codigoRevista) {
        this.codigoRevista = codigoRevista;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Long getIssueId() {
        return issueId;
    }

    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }

    public Long getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(Long purchaseId) {
        this.purchaseId = purchaseId;
    }

    public Long getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Long publisherId) {
        this.publisherId = publisherId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MagazineDTO)) {
            return false;
        }

        return id != null && id.equals(((MagazineDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MagazineDTO{" +
            "id=" + getId() +
            ", codigoRevista='" + getCodigoRevista() + "'" +
            ", preco=" + getPreco() +
            ", issueId=" + getIssueId() +
            ", purchaseId=" + getPurchaseId() +
            ", publisherId=" + getPublisherId() +
            "}";
    }
}
