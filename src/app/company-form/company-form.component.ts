import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyService } from "../company.service";
import { Company, EmployeeInfo } from "../models";
import { DESIGNATIONS, SKILL_OPTIONS, isPastDate, genId } from "../utils";

@Component({
  selector: "app-company-form",
  templateUrl: "./company-form.component.html",
  styleUrls: ["./company-form.component.css"],
})
export class CompanyFormComponent implements OnInit {
  designations = DESIGNATIONS;
  skillOptions = SKILL_OPTIONS;
  isEdit = false;
  companyId: string | null = null;
  saved = false;

  form = this.fb.group({
    companyName: ["", [Validators.required, Validators.maxLength(50)]],
    address: [""],
    email: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(100)],
    ],
    phoneNumber: ["", [Validators.required, Validators.maxLength(15)]],
    empInfo: this.fb.array([] as FormGroup[]),
  });

  constructor(
    private fb: FormBuilder,
    private svc: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addEmployee(); // at least one
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      const c = this.svc.get(id);
      if (c) {
        this.isEdit = true;
        this.companyId = id;
        this.setForm(c);
      }
    }
  }

  get empInfo() {
    return this.form.get("empInfo") as FormArray;
  }
  fc(name: string) {
    return this.form.get(name)!;
  }

  addEmployee() {
    const g = this.fb.group({
      id: [genId()],
      empName: ["", [Validators.required, Validators.maxLength(25)]],
      designation: ["Developer"],
      joinDate: [
        "",
        [
          Validators.required,
          (c: AbstractControl) =>
            isPastDate(c.value) ? null : { pastOnly: true },
        ],
      ],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      phoneNumber: ["", [Validators.required, Validators.maxLength(15)]],
      skillInfo: this.fb.array([]),
      educationInfo: this.fb.array([]),
    });
    this.empInfo.push(g);
  }

  removeEmployee(i: number) {
    this.empInfo.removeAt(i);
  }

  skillArray(i: number) {
    return (this.empInfo.at(i) as FormGroup).get("skillInfo") as FormArray;
  }
  eduArray(i: number) {
    return (this.empInfo.at(i) as FormGroup).get("educationInfo") as FormArray;
  }

  addSkill(i: number) {
    this.skillArray(i).push(
      this.fb.group({
        skillName: ["", Validators.required],
        skillRating: [
          1,
          [Validators.required, Validators.min(1), Validators.max(5)],
        ],
      })
    );
  }
  quickAddSkill(i: number, name: string) {
    const arr = this.skillArray(i);
    const exists = arr.value?.some(
      (s: any) => s.skillName?.toLowerCase() === name.toLowerCase()
    );
    if (!exists) {
      arr.push(
        this.fb.group({
          skillName: [name, Validators.required],
          skillRating: [
            3,
            [Validators.required, Validators.min(1), Validators.max(5)],
          ],
        })
      );
    }
  }
  removeSkill(i: number, si: number) {
    this.skillArray(i).removeAt(si);
  }

  addEdu(i: number) {
    this.eduArray(i).push(
      this.fb.group({
        instituteName: ["", [Validators.required, Validators.maxLength(50)]],
        courseName: ["", [Validators.required, Validators.maxLength(25)]],
        completedYear: ["", Validators.required],
      })
    );
  }
  removeEdu(i: number, ei: number) {
    this.eduArray(i).removeAt(ei);
  }

  setForm(c: Company) {
    this.form.patchValue({
      companyName: c.companyName,
      address: c.address || "",
      email: c.email,
      phoneNumber: c.phoneNumber,
    });
    this.empInfo.clear();
    for (const e of c.empInfo) {
      const eg = this.fb.group({
        id: [e.id],
        empName: [e.empName, [Validators.required, Validators.maxLength(25)]],
        designation: [e.designation],
        joinDate: [
          e.joinDate,
          [
            Validators.required,
            (c: AbstractControl) =>
              isPastDate(c.value) ? null : { pastOnly: true },
          ],
        ],
        email: [
          e.email,
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        phoneNumber: [
          e.phoneNumber,
          [Validators.required, Validators.maxLength(15)],
        ],
        skillInfo: this.fb.array([]),
        educationInfo: this.fb.array([]),
      });
      this.empInfo.push(eg);
      for (const s of e.skillInfo) {
        this.skillArray(this.empInfo.length - 1).push(
          this.fb.group({
            skillName: [s.skillName, Validators.required],
            skillRating: [
              s.skillRating,
              [Validators.required, Validators.min(1), Validators.max(5)],
            ],
          })
        );
      }
      for (const ed of e.educationInfo) {
        this.eduArray(this.empInfo.length - 1).push(
          this.fb.group({
            instituteName: [
              ed.instituteName,
              [Validators.required, Validators.maxLength(50)],
            ],
            courseName: [
              ed.courseName,
              [Validators.required, Validators.maxLength(25)],
            ],
            completedYear: [ed.completedYear, Validators.required],
          })
        );
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.value as any;
    const payload: Company = {
      id: this.isEdit && this.companyId ? this.companyId : genId(),
      companyName: raw.companyName,
      address: raw.address || "",
      email: raw.email,
      phoneNumber: raw.phoneNumber,
      createdAt: new Date().toISOString(),
      empInfo: (raw.empInfo || []).map((e: any) => ({
        id: e.id || genId(),
        empName: e.empName,
        designation: e.designation,
        joinDate: e.joinDate,
        email: e.email,
        phoneNumber: e.phoneNumber,
        skillInfo: (e.skillInfo || []).map((s: any) => ({
          skillName: s.skillName,
          skillRating: String(s.skillRating),
        })),
        educationInfo: (e.educationInfo || []).map((d: any) => ({
          instituteName: d.instituteName,
          courseName: d.courseName,
          completedYear: d.completedYear,
        })),
      })),
    };

    if (this.isEdit && this.companyId) {
      this.svc.update(this.companyId, payload);
    } else {
      this.svc.create(payload);
    }
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
    this.router.navigate(["/companies"]);
  }
}
