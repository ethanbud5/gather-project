SELECT ca.canvasser_id, ca.user_id,ca.name,ca.phone
FROM canvasser_in_advance cia
JOIN canvasser ca
ON ca.canvasser_id = cia.canvasser_id
WHERE cia.advance_id = $1;