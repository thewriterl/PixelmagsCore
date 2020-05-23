package com.pixelmags.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.pixelmags.domain.enumeration.PurchaseType;

/**
 * A Purchase.
 */
@Entity
@Table(name = "purchase")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Purchase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private PurchaseType tipo;

    @OneToOne
    @JoinColumn(unique = true)
    private SubscriptionPlan subscription;

    @OneToMany(mappedBy = "purchases")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    @OneToOne(mappedBy = "purchase")
    @JsonIgnore
    private Magazine magazine;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Purchase date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public PurchaseType getTipo() {
        return tipo;
    }

    public Purchase tipo(PurchaseType tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(PurchaseType tipo) {
        this.tipo = tipo;
    }

    public SubscriptionPlan getSubscription() {
        return subscription;
    }

    public Purchase subscription(SubscriptionPlan subscriptionPlan) {
        this.subscription = subscriptionPlan;
        return this;
    }

    public void setSubscription(SubscriptionPlan subscriptionPlan) {
        this.subscription = subscriptionPlan;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Purchase customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Purchase addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setPurchases(this);
        return this;
    }

    public Purchase removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setPurchases(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Magazine getMagazine() {
        return magazine;
    }

    public Purchase magazine(Magazine magazine) {
        this.magazine = magazine;
        return this;
    }

    public void setMagazine(Magazine magazine) {
        this.magazine = magazine;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Purchase)) {
            return false;
        }
        return id != null && id.equals(((Purchase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Purchase{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
