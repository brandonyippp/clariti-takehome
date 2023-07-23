export class Output {
  /**
   * Ask user for input (1-5)
   *  -Question will be:
   *      1. Entire department
   *      2. Specific category of department
   *      3. Specific subcategory of a category of a department
   *      4. Specific type of a subcategory of a category of a department
   *
   * Round phase first to figure out where they want to go
   *    Afterward, proceed with another flow to get the fee total they're looking for (hashmap for option -> conv flow array)
   *
   *
   * For any keys that aren't present in a map (e.g no rows with Type3 for a specific subcategory), probably include a note in prompt
   * that says *Please note that there are no Type3's for this specific bucket (check if hashmap contains, if not, add to array
   *    or something and iterate through, with initial phrase of *Please not that <arrayVals> are not present for this bucket)
   */

  public printHierarchy(): void {
    const structure = `
    +---------+                     +---------+
    |  Sales  |    <---- 1 ---->    |Marketing|
    |  Dept.  |                     |  Dept.  |
    +---------+                     +---------+
     /       \                               |
    v         v                              v
+----------+  +---------+                  +---------+
|Sales Eng.|  |Pre Sales|  <---- 2 ---->   |   ABM   |
| Category |  |Category |                  |Category |
+----------+  +---------+                  +---------+
   |              /  \                            /  \
   |             /    \                          /    \
   v            v      v                        v      v
+-------+ +-------+ +-------+               +-------+  +-------+
|Subcat1| |Subcat1| |Subcat2|   <-- 3 -->   |Subcat1|  |Subcat2|
+-------+ +-------+ +-------+               +-------+  +-------+
   |         |       /     \                      |       |
   v         v      v       v                     v       v
+-----+   +-----+ +-----+ +-----+               +-----+ +-----+ 
|TypeA|   |TypeC| |TypeA| |TypeB|   <-- 4 -->   |TypeA| |TypeC|
+-----+   +-----+ +-----+ +-----+               +-----+ +-----+
`;
    console.log(structure);
  }
}

/**
 * 1. Entire Department
 * 2. Category belonging to a Department
 * 3. Subcategory within a category belonging to a Department
 * 4. Specific Type of a Subcategory within a Category belonging to a Department
 * 
       +---------+                     +---------+
       |  Sales  |    <---- 1 ---->    |Marketing|
       |  Dept.  |                     |  Dept.  |
       +---------+                     +---------+
        /       \                              |
       v         v                             v
  +----------+  +---------+                  +---------+
  |Sales Eng.|  |Pre Sales|  <---- 2 ---->   |   ABM   |
  | Category |  |Category |                  |Category |
  +----------+  +---------+                  +---------+
    |             /  \                             /  \
    |            /    \                           /    \
    v           v      v                         v      v
 +-------+ +-------+ +-------+              +-------+  +-------+
 |Subcat1| |Subcat1| |Subcat2|  <-- 3 -->   |Subcat1|  |Subcat2|
 +-------+ +-------+ +-------+              +-------+  +-------+
    |          |       /    \                     |       |
    |          v      v      v                    v       v
 +-----+   +-----+ +-----+ +-----+             +-----+ +-----+ 
 |TypeA|   |TypeC| |TypeA| |TypeB|  <-- 4 -->  |TypeA| |TypeC|
 +-----+   +-----+ +-----+ +-----+             +-----+ +-----+
 */
