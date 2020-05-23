package com.pixelmags.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pixelmags.domain.Customer} entity.
 */
public class CustomerDTO implements Serializable {
    
    private Long id;

    private String name;

    private String email;

    private String fcm;


    private Long purchasesId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFcm() {
        return fcm;
    }

    public void setFcm(String fcm) {
        this.fcm = fcm;
    }

    public Long getPurchasesId() {
        return purchasesId;
    }

    public void setPurchasesId(Long purchaseId) {
        this.purchasesId = purchaseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerDTO)) {
            return false;
        }

        return id != null && id.equals(((CustomerDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", fcm='" + getFcm() + "'" +
            ", purchasesId=" + getPurchasesId() +
            "}";
    }
}
