package com.vivashield.repository;

import com.vivashield.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query(value = "UPDATE viva_shield_db.session s SET s.open_tab_urls = :updatedUrls  WHERE s.sessionid = :sessionID" ,
            nativeQuery = true)
    void updateStudentOpenUrl(@Param( "updatedUrls" ) String updatedUrls , @Param( "sessionID" ) Long sessionID);
}
