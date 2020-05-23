package com.pixelmags.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A Magazine.
 */
@Entity
@Table(name = "magazine")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Magazine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo_revista")
    private String codigoRevista;

    @Column(name = "preco", precision = 21, scale = 2)
    private BigDecimal preco;

    @OneToOne
    @JoinColumn(unique = true)
    private Issue issue;

    @OneToOne
    @JoinColumn(unique = true)
    private Purchase purchase;

    @ManyToOne
    @JsonIgnoreProperties(value = "magazines", allowSetters = true)
    private Publisher publisher;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoRevista() {
        return codigoRevista;
    }

    public Magazine codigoRevista(String codigoRevista) {
        this.codigoRevista = codigoRevista;
        return this;
    }

    public void setCodigoRevista(String codigoRevista) {
        this.codigoRevista = codigoRevista;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public Magazine preco(BigDecimal preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Issue getIssue() {
        return issue;
    }

    public Magazine issue(Issue issue) {
        this.issue = issue;
        return this;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public Magazine purchase(Purchase purchase) {
        this.purchase = purchase;
        return this;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public Magazine publisher(Publisher publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Magazine)) {
            return false;
        }
        return id != null && id.equals(((Magazine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Magazine{" +
            "id=" + getId() +
            ", codigoRevista='" + getCodigoRevista() + "'" +
            ", preco=" + getPreco() +
            "}";
    }
}
